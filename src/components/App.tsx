import { useEffect } from 'react';
import Background from './Background';
import Container from './Container';
import Footer from './Footer';
import Header from './Header';
import { useJobStore, useSearchText } from '../store/store';

function App() {
  const { searchText } = useSearchText();
  const { updateJobs } = useJobStore();

  useEffect(() => {
    if (!searchText) return;
    const fetchData = async () => {
      const response =
        await fetch(`https://bytegrad.com/course-assets/projects/rmtdev/api/data?search=
        ${searchText}`);
      const data = await response.json();
      updateJobs(data.jobItems);
    };

    fetchData();
    return () => {};
  }, [searchText]);

  return (
    <>
      <Background />
      <Header />
      <Container />
      <Footer />
    </>
  );
}

export default App;
