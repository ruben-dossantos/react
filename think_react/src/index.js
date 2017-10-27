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
    const product = this.props.product
    const name = product.stocked ?
      product.name :
      <span style={{color: 'red'}}> {product.name} </span>
		return (
			<tr>
				<td>{name}</td>
				<td>{product.price}</td>
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
    categories = categories || []
		if(products.length === index) return categories
		if(!categories.includes(products[index].category)){
			categories.push(products[index].category)
		}
		return this.getCategories(products, (index + 1), categories)
	}

	render(){
    const products = this.props.products
    const query = this.props.query
    const filteredProducts = products.filter(product => !query.inStock || ( query.inStock && product.stocked ))
      .filter(product => product.name.toLowerCase().includes(query.name.toLowerCase()))

		const categories = this.getCategories(filteredProducts, 0)
		const rows = []

		categories.forEach( category => {
			rows.push(<ProductCategory category={category} key={category} />)
			filteredProducts.forEach(product => {
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

class QueryProduct extends React.Component {
  handleChange(propertyName, event){
    this.props.handleChange(propertyName, event)
  }

  render(){
    return (
      <form>
        <input
          type="text"
          placeholder="Search..."
          value={this.props.query.name}
          onChange={this.handleChange.bind(this, 'name')} />

        <br/>
        <label>
          <input
            name="inStock"
            type="checkbox"
            checked={this.props.query.inStock}
            onChange={this.handleChange.bind(this, 'inStock')} />
            Only show products in stock
        </label>
      </form>
    )
  }
}

class App extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      products: this.props.products,
      query: {
        name: '',
        inStock: false
      }
    }
    this.handleChange = this.handleChange.bind(this)
  }

  handleChange(propertyName, event) {
    const query = this.state.query
    const target = event.target
    let value = propertyName === 'inStock' ? target.checked : target.value
    query[propertyName] = value
    this.setState({query: query})
  }


  render(){
    return (
      <div>
        <QueryProduct
          handleChange={this.handleChange}
          query={this.state.query} />
        <ProductTable
          query={this.state.query}
          products={this.state.products} />
      </div>
    )
  }
}

ReactDOM.render(
	<App products={data}/>,
	document.getElementById('root')
)
