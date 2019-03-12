import React,{Component} from 'react';
import {View,Animated,Text} from 'react-native';
import Deck from './Deck';
import {Card,Button} from 'react-native-elements';

const DATA = [
    { id: 1, text: 'Card #1', uri: 'http://imgs.abduzeedo.com/files/paul0v2/unsplash/unsplash-04.jpg' },
    { id: 2, text: 'Card #2', uri: 'http://www.fluxdigital.co/wp-content/uploads/2015/04/Unsplash.jpg' },
    { id: 3, text: 'Card #3', uri: 'http://imgs.abduzeedo.com/files/paul0v2/unsplash/unsplash-09.jpg' },
    { id: 4, text: 'Card #4', uri: 'http://imgs.abduzeedo.com/files/paul0v2/unsplash/unsplash-01.jpg' },
    { id: 5, text: 'Card #5', uri: 'http://imgs.abduzeedo.com/files/paul0v2/unsplash/unsplash-04.jpg' },
    { id: 6, text: 'Card #6', uri: 'http://www.fluxdigital.co/wp-content/uploads/2015/04/Unsplash.jpg' },
    { id: 7, text: 'Card #7', uri: 'http://imgs.abduzeedo.com/files/paul0v2/unsplash/unsplash-09.jpg' },
    { id: 8, text: 'Card #8', uri: 'http://imgs.abduzeedo.com/files/paul0v2/unsplash/unsplash-01.jpg' },
];

class App extends Component{
    renderCard(item){
        return(
            <Card
                key={item.id}
                title={item.text}
                image={{uri: item.uri}}
            >
                <Text style={{marginBottom:10}}>Test Text</Text>
                <Button icon={{name:'code'}} backgroundColor="#03A9F4" title="View"/>
            </Card>
        )
    }

    renderNoMoreCards(){
        return(
            <Card
                title="No more cards!"
            >
                <Text style={{marginBottom:10}}>You swiped all cards!</Text>
                <Button backgroundColor="#03A9F4" title="Load more"/>
            </Card>
        )
    }

    render(){
        return(
            <View>
                <Deck renderNoMoreCards={this.renderNoMoreCards()} data={DATA} renderCard={this.renderCard} />
            </View>
        )
    }

}

const styles = {

};

export default App;