import React, {Component} from 'react';
import {View, PanResponder, Animated, Dimensions,UIManager,LayoutAnimation} from 'react-native';

const SCREEN_WIDTH = Dimensions.get('window').width;
const MINIMUM_THRESHOLD = SCREEN_WIDTH * 0.25;

class Deck extends Component {
    static defaultProps = {
        onSwipeRight: () => {},
        onSwipeLeft: () => {},
    };

    constructor(props) {
        super(props);

        const position = new Animated.ValueXY();

        const panResponder = PanResponder.create({
            onStartShouldSetPanResponder: () => true,
            onPanResponderMove: (event, gesture) => {
                position.setValue({x: gesture.dx, y: 0});
            },
            onPanResponderEnd: (event, gesture) => {
                if (gesture.dx > MINIMUM_THRESHOLD) {
                    this.forceSwipe('right');
                }
                else if (gesture.dx < -MINIMUM_THRESHOLD) {
                    this.forceSwipe('left');
                }
                else {
                    this.resetPosition()
                }
            }
        });

        this.state = {panResponder, position, index: 0}

    }

    componentWillUpdate(){
        UIManager.setLayoutAnimationEnabledExperimental && UIManager.setLayoutAnimationEnabledExperimental(true);
        LayoutAnimation.spring();
    }

    forceSwipe(direction) {
        const x = direction === 'right' ? SCREEN_WIDTH : -SCREEN_WIDTH;

        Animated.timing(this.state.position, {
            toValue: {x, y: 0},
            duration: 300
        }).start(() => this.onForceSwipeCompletion(direction))
    }

    onForceSwipeCompletion(direction) {
        const {onSwipeRight, onSwipeLeft, data} = this.props;
        const item = data[this.state.index];

        direction === 'right' ? onSwipeRight(item) : onSwipeLeft(item);
        this.state.position.setValue({x:0,y:0});
        this.setState({index:this.state.index + 1});
    }

    resetPosition() {
        Animated.spring(this.state.position, {
            toValue: {x: 0, y: 0}
        }).start();
    }

    cardStyle() {
        const {position} = this.state;

        const rotate = position.x.interpolate({
            inputRange: [-SCREEN_WIDTH * 2.0, 0, SCREEN_WIDTH * 2.0],
            outputRange: ['-120deg', '0deg', '120deg']
        });

        return {
            ...position.getLayout(),
            transform: [{rotate}]
        }
    }

    renderCard() {
        if (this.state.index >= this.props.data.length){
            return this.props.renderNoMoreCards
        }

        const {data} = this.props;

        return data.map((item, i) => {
            const ind = data.length - 1 - i;
            console.log(data[ind], ind, this.state.index);
            if (ind < this.state.index){return null;}
            if (ind === this.state.index) {
                return (
                    <Animated.View key={data[ind].id} style={[this.cardStyle(), styles.cardStyle]} {...this.state.panResponder.panHandlers}>
                        {this.props.renderCard(data[ind])}
                    </Animated.View>
                )
            }
            return (
                <Animated.View key={data[ind].id} style={[styles.cardStyle,{top:10 * (ind - this.state.index)}]}>
                    {this.props.renderCard(data[ind])}
                </Animated.View>
            );
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

const styles={
    cardStyle:{
        position:'absolute',
        width:SCREEN_WIDTH,
        zIndex:999
    }
};

export default Deck;