import React from 'react'
import ReactDOM from 'react-dom'

const data = [
  {category: "Sporting Goods", price: "$49.99", stocked: true, name: "Football"},
  {category: "Sporting Goods", price: "$9.99", stocked: true, name: "Baseball"},
  {category: "Electronics", price: "$399.99", stocked: false, name: "iPhone 5"},
  {category: "Sporting Goods", price: "$29.99", stocked: false, name: "Basketball"},
  {category: "Electronics", price: "$99.99", stocked: true, name: "iPod Touch"},
  {category: "Electronics", price: "$199.99", stocked: true, name: "Nexus 7"}
]

class ProductRow extends React.Component {

	render(){
		return (
			<tr>
				<td>{this.props.product.name}</td>
				<td>{this.props.product.price}</td>
			</tr>
		)
	}
}

class ProductCategory extends React.Component{
	render(){
		return (
			<tr>
				<th colSpan="2">{this.props.category}</th>
			</tr>
		)
	}
}

class ProductTable extends React.Component{
	getCategories(products, index, categories) {
		if(products.length === index) return categories
		categories = categories || []
		if(!categories.includes(products[index].category)){
			categories.push(products[index].category)
		} 
		return this.getCategories(products, (index + 1), categories)
	}

	render(){
		const categories = this.getCategories(this.props.products, 0)
		const rows = []

		categories.forEach( category => {
			rows.push(<ProductCategory category={category} key={category} />)
			this.props.products.forEach(product => {
				if(product.category === category) rows.push(<ProductRow product={product} key={product.name} />)
			})
		})
		

		return (
			<table>
				<thead>
					<tr>
						<th>Name</th>
						<th>Price</th>
					</tr>
				</thead>
				<tbody>
					{rows}
				</tbody>
			</table>
		)
	}
}

ReactDOM.render(
	<ProductTable 
		products={data} />,
	document.getElementById('root')
)