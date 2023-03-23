import { Link } from 'react-router-dom';

const Page404 = () => {
  return (
    <div style={{ height: '100vh' }}>
      <p
        style={{
          textAlign: 'center',
          fontWeight: 'bold',
          fontSize: '26px',
          paddingTop: '300px',
          marginBottom: '30px',
        }}
      >
        Page doesn't exist
      </p>
      <Link
        style={{
          display: 'block',
          textAlign: 'center',
          fontWeight: 'bold',
          fontSize: '24px',
          marginTop: '30px',
          color: 'red',
        }}
        to="/"
      >
        Back to main page
      </Link>
    </div>
  );
};

export default Page404;
