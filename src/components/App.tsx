import { useEffect, useState } from "react";
import Background from "./Background";
import Container from "./Container";
import Footer from "./Footer";
import Header from "./Header";

function App() {
  const [searchText, setsearchText] = useState('');
  const [jobItems, setJobItems] = useState([])

  useEffect(() => {
    if (!searchText) return;
    const fetchData = async() => {
      const response = await fetch(`https://bytegrad.com/course-assets/projects/rmtdev/api/data?search=
        ${searchText}`)
        const data = await response.json()
        setJobItems(data.jobItems)
    };

    fetchData();
    return () => {
      
    }
  }, [searchText]);
  
  return (
    <>
    <Background/>
    <Header searchText={searchText} setSearchText={setsearchText}/> 
    <Container />
    <Footer />
    </>
  );
}

export default App;
