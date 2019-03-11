import React, {Component} from 'react';
import {View, PanResponder, Animated,Dimensions} from 'react-native';

const SCREEN_WIDTH = Dimensions.get('window').width;
const MINIMUM_THRESHOLD = SCREEN_WIDTH * 0.25;

class Deck extends Component {
    constructor(props) {
        super(props);

        const position = new Animated.ValueXY();

        const panResponder = PanResponder.create({
            onStartShouldSetPanResponder: () => true,
            onPanResponderMove: (event, gesture) => {
                position.setValue({x: gesture.dx, y: 0});
            },
            onPanResponderEnd: (event,gesture) => {
                if (gesture.dx > MINIMUM_THRESHOLD){
                    this.forceSwipe('right');
                }
                else if (gesture.dx < -MINIMUM_THRESHOLD){
                    this.forceSwipe('left');
                }
                else{
                    this.resetPosition()
                }
            }
        });

        this.state = {panResponder, position}

    }

    forceSwipe(direction){
        const x = direction === 'right' ? SCREEN_WIDTH : -SCREEN_WIDTH;

        Animated.timing(this.state.position,{
            toValue:{x,y:0},
            duration:300
        }).start()
    }

    resetPosition(){
        Animated.spring(this.state.position,{
            toValue:{x:0,y:0}
        }).start();
    }

    cardStyle(){
        const {position} = this.state;

        const rotate = position.x.interpolate({
            inputRange:[-SCREEN_WIDTH * 1.5, 0, SCREEN_WIDTH * 1.5],
            outputRange:['-120deg','0deg','120deg']
        });

        return{
            ...position.getLayout(),
            transform:[{rotate}]
        }
    }

    renderCard() {
        return this.props.data.map((item,index) => {
            if (index === 0 ){
                return(
                    <Animated.View style={this.cardStyle()} {...this.state.panResponder.panHandlers}>
                        {this.props.renderCard(item)}
                    </Animated.View>
                )
            }
            return this.props.renderCard(item);
        });
    }

    render() {
        return (
            <View>
                {this.renderCard()}
            </View>
        )
    }
}

export default Deck;