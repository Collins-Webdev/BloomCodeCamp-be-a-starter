package com.hcc.repositories;

import com.hcc.entities.Assignment;
import com.hcc.entities.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Set;

public interface AssignmentRepository extends JpaRepository<Assignment, Long> {
    Set<Assignment> findByUser(User user);
}