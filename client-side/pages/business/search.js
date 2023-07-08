import Head from 'next/head';
import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import axios from 'axios';
import styles from '../../styles/Search.module.css';
import Navbar from '../../components/Navbar';
import PaginationComponent from '../../components/Pagination';
import Link from 'next/link';
import { PaginationContext } from '../../contexts/paginationContext.js';
import CircularIndeterminate from '../../components/Spinner';
import { useContext } from 'react';

export default function business() {
  const { Page } = useContext(PaginationContext);
  const router = useRouter();
  const [business, setBusiness] = useState(null);
  const [businessCount, setBusinessCount] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  // const  category  = router.query.category;
  // const  names  = router.query.name;
  // const  state  = router.query.state;
  // const  city  = router.query.city;
  // console.log([category,names,state,city]);
  // const limit = 10;

  // let encodedName = encodeURIComponent(names ? names.trim() : "");
  // let encodedCategory = encodeURIComponent(category ? category.trim() : "");
  // let encodedState = encodeURIComponent(state ? state.trim() : "");
  // let encodedCity = encodeURIComponent(city ? city.trim() : "");

  // let url_base1 = `http://localhost:3000/api/business/search?`;
  // let url_base2 = `http://localhost:3000/api/business/searchCount?`;
  // let nameparam = encodedName ? `name=${encodedName}` : "";
  // let categoryparam = encodedCategory ? `&category=${encodedCategory}` : "";
  // let stateparam = encodedState ? `&state=${encodedState}` : "";
  // let cityparam = encodedCity ? `&city=${encodedCity}` : "";
  // let limitparam = `&limit=${limit}`;
  // let startat = `&startat=${(Page-1)*limit}`;
  // let url1 = url_base1 + nameparam + categoryparam + stateparam + cityparam + limitparam + startat;
  // console.log(url1);
  // let url2 = url_base2 + nameparam + categoryparam + stateparam + cityparam;

  useEffect(() => {
    const fetchBusiness = async () => {
      if (router.isReady) {
        const  category  = router.query.category;
        const  names  = router.query.name;
        const  state  = router.query.state;
        const  city  = router.query.city;
        console.log([category,names,state,city]);
        const limit = 10;

        let encodedName = encodeURIComponent(names ? names.trim() : "");
        let encodedCategory = encodeURIComponent(category ? category.trim() : "");
        let encodedState = encodeURIComponent(state ? state.trim() : "");
        let encodedCity = encodeURIComponent(city ? city.trim() : "");

        let url_base1 = `http://localhost:3000/api/business/search?`;
        let nameparam = encodedName ? `name=${encodedName}` : "";
        let categoryparam = encodedCategory ? `&category=${encodedCategory}` : "";
        let stateparam = encodedState ? `&state=${encodedState}` : "";
        let cityparam = encodedCity ? `&city=${encodedCity}` : "";
        let limitparam = `&limit=${limit}`;
        let startat = `&startat=${(Page-1)*limit}`;
        let url1 = url_base1 + nameparam + categoryparam + stateparam + cityparam + limitparam + startat;
        try {
          const res1 = await axios.get(url1,{ withCredentials: true });
          setBusiness(res1.data);
          setIsLoading(false);
          console.log(business);
        } catch (error) {
          console.error(error);
        }
      }
    };
    fetchBusiness();
  }, [router.isReady,Page]);

  useEffect(() => {
    const fetchBusinessCount = async () => {
      if (router.isReady) {
        const  category  = router.query.category;
        const  names  = router.query.name;
        const  state  = router.query.state;
        const  city  = router.query.city;
        let encodedName = encodeURIComponent(names ? names.trim() : "");
        let encodedCategory = encodeURIComponent(category ? category.trim() : "");
        let encodedState = encodeURIComponent(state ? state.trim() : "");
        let encodedCity = encodeURIComponent(city ? city.trim() : "");
        let url_base2 = `http://localhost:3000/api/business/searchCount?`;
        let nameparam = encodedName ? `name=${encodedName}` : "";
        let categoryparam = encodedCategory ? `&category=${encodedCategory}` : "";
        let stateparam = encodedState ? `&state=${encodedState}` : "";
        let cityparam = encodedCity ? `&city=${encodedCity}` : "";
        let url2 = url_base2 + nameparam + categoryparam + stateparam + cityparam;
        try {
          const res2 = await axios.get(url2,{ withCredentials: true });
          setBusinessCount(res2.data);
          console.log(businessCount);
        } catch (error) {
          console.error(error);
        }
      }
    };

    fetchBusinessCount();
  }, [router.isReady]);

  return (
    
    <div className={styles.container}>
      {business ? (
      <div className={styles.container2}>
      <Head>
        <title>{"Search Result"}</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Navbar> </Navbar>
      
      <main className={styles.main}>
        <h1 className={styles.title}>{"Search Result"}</h1>
        
        {/* <p className={styles.info}>{business.reviewCount}</p> */}
        
        <div className={styles.reviews}>
          {business.map((single_business, index) => (
            <div key={index} className={styles.review}>
              {/* <h3>{review.reviewerName}</h3> */}
              {typeof single_business.bid === 'string' && single_business.bid.trim() !== "" && (
                <div>
                    <p className={styles.info}>
                        <Link href={`http://localhost:8000/business/${single_business.bid}`} className={styles.linkClass}>
                                {single_business.name} {" "}
                                {single_business.cate} {" "}
                                Open Hours: {single_business.hours} {" "}
                                Stars: {"★".repeat(single_business.stars)}
                        </Link>
                    </p>
                </div>
              )}
            </div>
          ))}
        </div>
      </main>
      <PaginationComponent totalCount={businessCount ? businessCount[0].count : 0} className={styles.pagination}/>
      </div>
      ) : (
      <div>
      <CircularIndeterminate />
      <p>Loading...</p>
      </div>
      )}
    </div>
  );
};

