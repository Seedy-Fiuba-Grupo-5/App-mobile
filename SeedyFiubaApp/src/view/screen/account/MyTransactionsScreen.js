import Loading from "../../component/Loading";
import {RefreshControl, ScrollView, View} from "react-native";
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

    const getTransactions = () => {
        ApiUser.getTransactions(id)
            .then((data) => {
                setIsLoading(false);
                setTransactions(data.allTransactions);
            })
            .catch((error) => {
                setIsLoading(false);
                console.log(error);
            });
    }

    useEffect(() => {
        getTransactions();
    },[]);

    const onRefresh = useCallback(() => {
        setRefreshing(true);
        getTransactions();
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
                                                    <Card.FeaturedSubtitle style={ProjectCardStyleSheet.description}>
                                                        Amount of Ethers: {transaction.amountEthers}
                                                    </Card.FeaturedSubtitle>
                                                    <Card.FeaturedSubtitle numberOfLines={1}
                                                                           style={ProjectCardStyleSheet.description}>
                                                        Transaction State: {transaction.transactionState}
                                                    </Card.FeaturedSubtitle>
                                                    <Card.FeaturedSubtitle numberOfLines={1}
                                                                           style={ProjectCardStyleSheet.description}>
                                                        To Project: {transaction.toPublicId}
                                                     </Card.FeaturedSubtitle>
                                                </Card>
                                            )
                                        }
                                    )
                            }
                            {transactions.length === 0?
                                <SeedyFiubaEmpty title={'Without any Transactions'}/> : null
                            }
                        </ScrollView>
                    )
            }
        </>
    )
}

export default MyTransactionsScreen