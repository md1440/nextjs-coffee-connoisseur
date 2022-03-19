/* eslint-disable react/destructuring-assignment */
import { GetStaticPropsContext, GetStaticPropsResult } from 'next';
import Head from "next/head";
import Image from "next/image";
import { ReactElement } from "react";
import Banner from "../components/Banner";
import Card from "../components/Card";
import coffeeStoresData from "../data/coffee-stores.json";
import styles from "../styles/Home.module.css";

interface CoffeeStores {
	coffeeStores: CoffeeStore[];
}

interface CoffeeStore {
	id: number;
	name: string;
	imgUrl: string;
	websiteUrl: string;
	address: string;
	neighbourhood: string;
}

export async function getStaticProps(context: GetStaticPropsContext): Promise<GetStaticPropsResult<CoffeeStores>> {
	return {
		props: {
			coffeeStores: coffeeStoresData,
		}, // will be passed to the page component as props
	};
}


function Home(props: CoffeeStores): ReactElement {
	const handleOnBannerBtnClick = () => {
		console.log("Hi Banner button");
	};
	return (
		<div className={styles.container}>
			<Head>
				<title>Coffee Connoisseur</title>
				<meta name="description" content="Generated by create next app" />
				<link rel="icon" href="/favicon.ico" />
			</Head>

			<main className={styles.main}>
				<Banner buttonText="View stores nearby" handleOnClick={handleOnBannerBtnClick} />
				<div className={styles.heroImage}>
					<Image src="/static/hero-image.png" width={700} height={400} />
				</div>
				{props.coffeeStores.length > 0 && (
					<>
						<h2 className={styles.heading2}>Toronto stores</h2>
						<div className={styles.cardLayout}>
							{props.coffeeStores.map((coffeeStore: CoffeeStore) => (
								<Card
									key={coffeeStore.id}
									name={coffeeStore.name}
									imgUrl={coffeeStore.imgUrl}
									href={`/coffee-store/${coffeeStore.id}`}
								/>
							))}
						</div>
					</>
				)}
			</main>
		</div>
	);
}

export default Home;
