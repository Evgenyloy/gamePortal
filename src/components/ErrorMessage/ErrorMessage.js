import img from './error.gif';

const ErrorMessage = () => {
  return (
    <img
      style={{
        display: 'block',
        maxWidth: '400px',
        maxHeight: '400px',
        objectFit: 'cover',
        margin: '0 auto',
      }}
      src={img}
      alt="Error"
    />
  );
};

export default ErrorMessage;
