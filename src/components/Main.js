import React, { Component } from 'react';

class Main extends Component {
  constructor(props) {
    super(props)

    this.state = {
      copySuccess: false
    }
  }

  copyCodeToClipboard = () => {
    const el = this.textArea
    el.select()
    document.execCommand("copy")
    this.setState({copySuccess: true})
  }

  render() {
    return (
      <div id="content">
        <p>&nbsp;</p>
        <h2>Buy Product</h2>
        <table className="table">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Name</th>
              <th scope="col">Price</th>
              <th scope="col">Owner</th>
              <th scope="col"></th>
            </tr>
          </thead>
          <tbody id="productList">
            {this.props.products.map((product, key) => {
              console.log(product.fleekUrl);
             
              return (
                <div>
                  <div>
                    <textarea className="clipboard-text"
                      ref={(textarea) => this.textArea = textarea}
                      value={product.fleekUrl}
                    />
                  </div>
                  <tr key={key}>
                  <th scope="row">{product.id.toString()}</th>
                  <td>{product.name}</td>
                  <td>{window.web3.utils.fromWei(product.price.toString(), "ether")} Eth</td>
                  <td>{product.owner}</td>
                  <td>
                    {!product.purchased
                      ? <button
                        name={product.id}
                        value={product.price}
                        onClick={(event) => {
                          //this.props.purchaseProduct(event.target.name, event.target.value)
                          this.copyCodeToClipboard()
                        }}
                        >
                          Buy
                        </button>
                      : null
                    }
                  </td>
                </tr>
                
                </div>
                
              )
            })}
          </tbody>
        </table>
        {
              this.state.copySuccess ?
              <div style={{"color": "green"}}>
                Copied to Clipboard!
              </div> : null
        }
        <p><a href="https://explorer-mumbai.maticvigil.com/tx/0xec9b4b0aa6c03ce11a1f8d5a6189cd46efe87a1755a8fdc9deec2a65a5bd1b70/logs" target="_blank">Contract information</a></p>
      </div>
    );
  }
}

export default Main;
