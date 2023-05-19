import { Component } from "react";



export class Searchbar extends Component {
  state = {
    findtext: '',    
    // articles: [],    
  };
  hendlerChange = ({ target: { value } }) => {   
    this.setState({
      findtext: value,
    }); 
    
           
  };
  hendlerSubmit = (e) => {
    e.preventDefault();
    if (this.state.findtext.trim() === '') {
      return;
    }
    this.props.saved(this.state.findtext.trim().replace(' ','+'))
    this.setState({findtext:''})
  };

    
  render() {
    return (
      <header className="searchbar">
        <form className="searchForm" onSubmit={this.hendlerSubmit}>
          <button type="submit" className="searchForm-button">
            <span className="searchForm-button-label">Search</span>
          </button>

          <input
            className="searchForm-input"
            type="text"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
            onChange={this.hendlerChange}
            value={this.state.findtext}
          />
        </form>
      </header>
    );
  }
}