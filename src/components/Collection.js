import React from 'react';
import axios from "axios"

class Collection extends React.Component {
	state = {
		title: '',
		year: '',
		label: '',
		estEnRequete: true
	};

	componentDidMount = () => {
		this.requetes();
	}

	requetes = async () => {
		const intItemParPage = 100;
		const intItemAleatoire = Math.floor(Math.random() * 100);

		try {
			const premiereRequete = await axios.get(`https://api.discogs.com/users/ausamerika/collection/folders/0/releases?per_page=${intItemParPage}`);
			const { data: { pagination: { pages } } } = await premiereRequete;
			const intPageAleatoire = Math.floor(Math.random() * pages);

			const secondeRequete = await axios.get(`https://api.discogs.com/users/ausamerika/collection/folders/0/releases?page=${intPageAleatoire}&per_page=${intItemParPage}`);
			const { data: { releases } } = await secondeRequete;
			const itemRetourne = releases[intItemAleatoire];

			this.setState({
				title: itemRetourne.basic_information.title ? itemRetourne.basic_information.title : 'Pas spécifié',
				year: itemRetourne.basic_information.year ? itemRetourne.basic_information.year : 'Pas spécifiée',
				label: itemRetourne.basic_information.labels[0].name ? itemRetourne.basic_information.labels[0].name : 'Pas spécifié',
				estEnRequete: false
			})
		}
		catch (error) {
			this.setState({
				error
			})
		}
	}

	render() {
		const { title, year, label, error } = this.state;

		if (error) {
			return (
				<div className="collection">
					<h1>La requête a échouée</h1>
				</div>
			)
		}
		else if (this.state.estEnRequete) {
			return (
				<div className="collection">
					<h1>La requête est en cours...</h1>
				</div>
			)
		}
		return (
			<div className="collection">
				<h1>Titre: {title}</h1>
				<ul>
					<li>Année de publication: {year}</li>
					<li>Label: {label}</li>
				</ul>
			</div>
		)
	}
}
export default Collection