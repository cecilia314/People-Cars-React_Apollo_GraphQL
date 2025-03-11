import { Divider } from 'antd';

const Title = () => {
  const styles = getStyles();

  return (
    <header style={styles.header}>
      <h1 style={styles.title}>People and their cars</h1>
      <Divider />
    </header>
  );
};

const getStyles = () => ({
  header: {
    margin: '16px 48px',
  },
  title: {
    fontSize: 30,
    padding: '0px 16px',
    textTransform: 'uppercase',
    textAlign: 'center',
  },
});

export default Title;
