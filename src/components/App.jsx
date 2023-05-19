import { Component } from "react";
import { Searchbar } from "./Searchbar/Searchbar";
import { ImageGalleryItem } from './ImageGalleryItem/ImageGalleryItem';
import { ImageGallery } from './ImageGallery/ImageGallery';
import './styles.css'
import { Button } from "./Button/Button";
import { getSearchImage } from "api/getSearchImage";
import { Loader } from "./Loader/Loader";
import { Modal } from "./Modal/Modal";

export class App extends Component {
  state = {   
    images: [],
    findText:'',
    totalHits: 0,
    page: 1,
    imageURL:'',
    isLoading: false,
    openModal: false,
    error:'',
  };
  hendlerSavedData = event => {
    this.setState({
      findText: event,      
    });

  };
  componentDidUpdate(prevPropps, prevState) {
    if (prevState.findText !== this.state.findText || prevState.page !== this.state.page) {
      this.setState({isLoading:true,})
      getSearchImage(this.state.findText, this.state.page).then(
        ( data ) => {           
          if (this.state.page === 1) {
            this.setState({
              images: [...data.hits],
              totalHits: data.totalHits,
            })            
            return;
           }
          this.setState((prevState) => ({
            images: [...prevState.images, ...data.hits],
            totalHits:data.totalHits,
          }))
        }
      ).catch((error) => {
        this.setState({error})
      })
        .finally(() => { this.setState({ isLoading: false }) })
    }
  }
  hendlerPageIncrement = () => {
    this.setState((prev) => ({
      page: prev.page + 1,
    }))
  }
  hendlerClickImage = (event) => {
    event.preventDefault()    
    this.setState({ imageURL: event.target.attributes[3].value, openModal: true, });
    window.addEventListener('keydown',this.hendlerCloseModalEsc)
  }
  hendlerCloseModalEsc = (event) => {
    if (event.key === 'Escape') {
      this.setState({ openModal: false })
      window.removeEventListener('keydown', this.hendlerCloseModalEsc)
      return;
    }
  };
  hendlerCloseModalClick = (event) => {    
    if (event.target.className === 'Overlay') {
      this.setState({openModal:false})
    }
  }
  render() {
    return (
      <div className="app">
        <Searchbar saved={this.hendlerSavedData} />
        {this.state.openModal && (
          <Modal imageURL={this.state.imageURL} closeModal={ this.hendlerCloseModalClick} />
        )}
        <Loader isLoading={this.state.isLoading} />
        <ImageGallery>
          <ImageGalleryItem
            data={this.state.images}
            onClick={this.hendlerClickImage}
          />
        </ImageGallery>
        {this.state.totalHits !== 0 &&
          this.state.totalHits - this.state.page * 12 > 0 && (
            <Button click={this.hendlerPageIncrement} />
          )}
      </div>
    );
  }
}
