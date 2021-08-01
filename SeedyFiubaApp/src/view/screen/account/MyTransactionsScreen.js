import Loading from "../../component/Loading";
import {RefreshControl, ScrollView, Text, View} from "react-native";
import React, {useCallback, useEffect, useState} from "react";
import UseAuth from "../../component/UseAuth";
import ApiUser from "../../../model/ApiUser";
import ProjectCardStyleSheet from "../../Styles/ProjectCardStyleSheet";
import {Card, Icon} from "react-native-elements";
import SeedyFiubaEmpty from "../../component/SeedyFiubaEmpty";
const MyTransactionsScreen = ({navigation}) => {
    const [transactions, setTransactions ] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [refreshing, setRefreshing] = React.useState(false);
    const {id} = UseAuth();


    const getTransactions = (action) => {
        ApiUser.getTransactions(id)
            .then((data) => {
                action(false);
                setTransactions(data.allTransactions);
            })
            .catch((error) => {
                action(false);
                console.log(error);
            });
    }

    useEffect(() => {
        return navigation.addListener('focus', () => {
            setIsLoading(true);
            getTransactions(setIsLoading);
        });
    }, [navigation]);

    const onRefresh = useCallback(() => {
        setRefreshing(true);
        getTransactions(setRefreshing);
    }, []);

    return(
        <>
            {
                isLoading ? (<Loading customStyle={{paddingTop:0}}/>) :
                    (
                        <ScrollView
                            refreshControl={
                                <RefreshControl
                                    refreshing={refreshing}
                                    onRefresh={onRefresh}
                                    colors={['#4b1e4d']}
                                />
                            }>

                            {
                                transactions
                                    .sort((a, b) => {
                                        const date_a = new Date(...a.updatedAt.split('/').reverse())
                                        const date_b = new Date(...b.updatedAt.split('/').reverse())
                                        if(date_a > date_b){
                                            return 1;
                                        } else {
                                            return -1;
                                        }
                                    })
                                    .map((transaction) => {
                                            return (
                                                <Card key={transaction.id} containerStyle={ProjectCardStyleSheet.projectCard}>
                                                    <Card.Title
                                                        style={ProjectCardStyleSheet.title}>
                                                        {transaction.updatedAt.split('T')[0]} {transaction.updatedAt.split('T')[1].split('.')[0]}
                                                    </Card.Title>
                                                    <View style={{padding:2}}>
                                                        <Text style={{fontSize: 20, color: 'grey'}}>State:</Text>
                                                        <Text style={{fontSize: 22}}>{transaction.transactionState}</Text>
                                                    </View>
                                                    <View style={{flexDirection:'row', justifyContent:'space-between'}}>
                                                        <View style={{flexDirection:'row'}}>
                                                            <Text style={{fontSize: 20, color: 'grey'}}>Ethers:</Text>
                                                            <Text style={{fontSize: 22, paddingLeft:10}}>{transaction.amountEthers}</Text>
                                                        </View>
                                                        <View style={{flexDirection:'row'}}>
                                                            <Text style={{fontSize: 20, color: 'grey'}}>Project Id:</Text>
                                                            <Text style={{fontSize: 22, paddingLeft:10}}>{transaction.toPublicId}</Text>
                                                        </View>
                                                    </View>
                                                </Card>
                                            )
                                        }
                                    )
                            }
                            {transactions.length === 0?
                                <SeedyFiubaEmpty title={'Without any Transactions'}/> : null
                            }
                            <Text/>
                        </ScrollView>
                    )
            }
        </>
    )
}

export default MyTransactionsScreen