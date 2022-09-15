import Head from 'next/head'
import Link from 'next/link';
import {ApolloClient, InMemoryCache,gql,} from '@apollo/client'
import Layout from '@components/Layout';
import Container from '@components/Container';
import Button from '@components/Button';

import products from '@data/products';

import styles from '@styles/Page.module.scss'

export default function Home({home}) {
  const {heroTitle, heroText, heroLink, heroBackground} = home
  return (
    <Layout>
    <Head>
      <title>Space Jelly Gear</title>
      <meta name="description" content="Get your Space Jelly gear!" />
    </Head>

    <Container>
      <h1 className="sr-only">Space Jelly Gear</h1>

      <div className={styles.hero}>
        <Link href={heroLink}>
          <a>
            <div className={styles.heroContent}>
            
            </div>
            <img className={styles.heroImage} width={heroBackground.width} height={heroBackground.height} src={heroBackground.url} alt="" />
          </a>
        </Link>
      </div>

      <h2 className={styles.heading}>Featured Gear</h2>

      <ul className={styles.products}>
        {products.map(product => {
          return (
            <li key={product.slug}>
              <Link href={`/products/${product.slug}`}>
                <a>
                  <div className={styles.productImage}>
                    <img width={product.image.width} height={product.image.height} src={product.image.url} alt="" />
                  </div>
                  <h3 className={styles.productTitle}>
                    { product.name }
                  </h3>
                  <p className={styles.productPrice}>
                    ${ product.price }
                  </p>
                </a>
              </Link>
              <p>
              <Button
                className="snipcart-add-item"
                data-item-id={product.id}
                data-item-price={product.price}
                data-item-url={`/products/${product.slug}`}
                data-item-image={product.image.url}
                data-item-name={product.name}>Add to Cart</Button>
              </p>
            </li>
          )
        })}
      </ul>
    </Container>
  </Layout>
)
}
export async function getStaticProps(props) {
  const client = new ApolloClient({
    uri: 'https://api-us-east-1.hygraph.com/v2/cl7lubw011hip01t72l5q3w9t/master',
    cache: new InMemoryCache(),
  })
  const data = await client.query({
    query: gql`query PageHome {
      page(where: {slug: "home"}) {
        heroLink
        heroText
        heroTitle
        id
        name
        slug
        heroBackground {
          height
          url
          width
        }
      }
    }`
  })

     // products(first: 4) {
        //   id
        //   name
        //   price
        //   slug
        //   image
        // }
  const home = data.data.page;
  return {
    props:{home}
  }
}