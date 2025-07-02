package com.hcc.controllers;

import com.hcc.dto.AssignmentResponseDto;
import com.hcc.entities.Assignment;
import com.hcc.entities.User;
import com.hcc.repositories.AssignmentRepository;
import com.hcc.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;
import java.util.Set;

@RestController
@RequestMapping("/api/assignments")
public class AssignmentController {
    @Autowired
    private AssignmentRepository assignmentRepo;

    @Autowired
    private UserRepository userRepo;

    @GetMapping
    public ResponseEntity<?> getAssignments(@AuthenticationPrincipal User user) {
        Set<Assignment> assignments = assignmentRepo.findByUser(user);
        return ResponseEntity.ok(assignments);
    }

    @GetMapping("{id}")
    public ResponseEntity<?> getAssignment(@PathVariable Long id,
                                           @AuthenticationPrincipal User user) {
        Optional<Assignment> assignmentOpt = assignmentRepo.findById(id);

        return assignmentOpt.map(assignment -> {
            if (assignment.getUser().getId().equals(user.getId())) {
                return ResponseEntity.ok(new AssignmentResponseDto(assignment));
            } else {
                return ResponseEntity.status(403).build();
            }
        }).orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public ResponseEntity<?> createAssignment(@RequestBody Assignment assignment,
                                              @AuthenticationPrincipal User user) {
        assignment.setUser(user);
        assignment.setStatus("Pending Submission");
        Assignment savedAssignment = assignmentRepo.save(assignment);
        return ResponseEntity.ok(savedAssignment);
    }

    @PutMapping("{id}")
    public ResponseEntity<?> updateAssignment(@PathVariable Long id,
                                              @RequestBody Assignment assignment,
                                              @AuthenticationPrincipal User user) {
        Optional<Assignment> assignmentOpt = assignmentRepo.findById(id);

        if (assignmentOpt.isPresent()) {
            Assignment existingAssignment = assignmentOpt.get();
            if (existingAssignment.getUser().getId().equals(user.getId())) {
                existingAssignment.setStatus(assignment.getStatus());
                existingAssignment.setGithubUrl(assignment.getGithubUrl());
                existingAssignment.setBranch(assignment.getBranch());
                existingAssignment.setReviewVideoUrl(assignment.getReviewVideoUrl());

                Assignment updatedAssignment = assignmentRepo.save(existingAssignment);
                return ResponseEntity.ok(updatedAssignment);
            }
        }
        return ResponseEntity.notFound().build();
    }
}