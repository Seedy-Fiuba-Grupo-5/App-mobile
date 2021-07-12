import React from "react";
import {ScrollView, Text, View} from "react-native";

const AccountCarousel = (props,{items}) => {
    const [interval, setInterval] = React.useState(1);
    const [intervals, setIntervals] = React.useState(1);
    const [width, setWidth] = React.useState(0);
    const init = (width) => {
        setWidth(width);
        const totalItems = props.children.length;
        const itemsPerInterval = items === undefined ?1:items;
        setIntervals(Math.ceil(totalItems / itemsPerInterval));
    }
    const getInterval = (offset) => {
        for (let i = 1; i <= intervals; i++) {
            if (offset+1 < (width / intervals) * i) {
                return i;
            }
            if (i === intervals) {
                return i;
            }
        }
    }

    let points = [];
    for (let i = 1; i <= intervals; i++) {
        points.push(
            <Text
                key={i}
                style={{
                    fontSize:50,
                    paddingHorizontal: 5,
                    opacity: interval === i ? 0.5 : 0.1}}>
                &bull;
            </Text>
        );
    }

    return(
        <View
            style={{
                width: '100%',
                borderRadius: 10,
                marginTop: 10
            }}>
            <ScrollView
                horizontal={true}
                showsHorizontalScrollIndicator={false}
                scrollEventThrottle={100}
                decelerationRate="fast"
                pagingEnabled
                contentContainerStyle={{
                    display: 'flex',
                    flexDirection: 'row',
                    overflow: 'hidden',
                    width: `${100 * intervals}%` }}

                onContentSizeChange={(w, h) => init(w)}
                onScroll={data => {
                    setWidth(data.nativeEvent.contentSize.width);
                    setInterval(getInterval(data.nativeEvent.contentOffset.x));}}
                >
                {
                    props.children.map((item, index, a)=>{
                        return(
                            <View key={index} style={{width:'50%'}}>
                                {item}
                            </View>
                        )
                    })
                }
            </ScrollView>
            <View
                style={{
                    display: 'flex',
                    justifyContent: 'center',
                    flexDirection: 'row'}}>
                {points}
            </View>
        </View>
    )
}
export default AccountCarousel