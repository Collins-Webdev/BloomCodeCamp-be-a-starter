export default function LearnerDashboard() {
  return (
    <div style={{padding: '20px'}}>
      <h1>LEARNER DASHBOARD</h1>
      
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(3, 1fr)',
        gap: '20px',
        marginTop: '30px'
      }}>
        {/* Colonne Submitted */}
        <div style={{border: '1px solid #ddd', padding: '15px'}}>
          <h3>Submitted</h3>
          <div style={{
            backgroundColor: '#f8f9fa',
            padding: '10px',
            margin: '10px 0',
            borderRadius: '5px'
          }}>Assignment #1</div>
        </div>

        {/* Colonne In Review */}
        <div style={{border: '1px solid #ddd', padding: '15px'}}>
          <h3>In Review</h3>
          <div style={{
            backgroundColor: '#f8f9fa',
            padding: '10px',
            margin: '10px 0',
            borderRadius: '5px'
          }}>Assignment #2</div>
        </div>

        {/* Colonne Completed */}
        <div style={{border: '1px solid #ddd', padding: '15px'}}>
          <h3>Completed</h3>
          <div style={{
            backgroundColor: '#f8f9fa',
            padding: '10px',
            margin: '10px 0',
            borderRadius: '5px'
          }}>Assignment #3</div>
        </div>
      </div>
    </div>
  );
}