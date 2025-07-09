export default function HomePage() {
  return (
    <div style={styles.container}>
      <h1>Welcome To The Assignment Review APP</h1>
      <a href="/login" style={styles.link}>Login</a>
    </div>
  );
}

const styles = {
  container: {
    textAlign: 'center',
    marginTop: '50px'
  },
  link: {
    display: 'inline-block',
    marginTop: '20px',
    padding: '10px 20px',
    backgroundColor: '#007bff',
    color: 'white',
    textDecoration: 'none',
    borderRadius: '5px'
  }
};