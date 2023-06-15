import { styled } from '@mui/system';

export const styles = {
  link: {
    color: '#000',
  },
  heroBox: {
    width: '100%',
    display: 'flex',
    minHeight: '360px',
    alignItems: 'center',
    justifyContent: 'center',
  },
  gridContainer: {
    display: 'flex',
    alignItems: 'center',
    maxWidth: '1300px',
    padding: '50px',
  },
  title: {
    paddingBottom: '15px',
  },
  subtitle: {
    opacity: '0.4',
    paddingBottom: '30px',
  },
  largeImage: {
    width: '100%',
  },
  aboutUsContainer: {
    width: '100%',
    display: 'flex',
    minHeight: '400px',
    alignItems: 'center',
    justifyContent: 'center',
    margin: '30px 0px 50px 0px',
  },
  aboutUsSubtitle: {
    opacity: '0.7',
    paddingBottom: '30px',
    fontSize: '18px',
  },
  sectionGridContainer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    minHeight: '500px',
  },
  sectionGridItem: {
    backgroundColor: '#f2f0f1',
    textAlign: 'center',
    padding: '30px',
    width: '200px',
    borderRadius: '10px',
    margin: '10px !important',
  }
}
export const Img = styled('img')(({ theme }) => ({
  ...styles.largeImage,
}));
