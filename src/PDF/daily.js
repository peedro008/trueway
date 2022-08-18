import React, { useEffect, useState } from "react";
import {
  Page,
  Text,
  View,
  Document,
  StyleSheet,
  Image,
  Font,
} from "@react-pdf/renderer";
import ReactPDF from "@react-pdf/renderer";
import LOGOpdf from "../assets/LOGOpdf.png";
import RobotoMedium from "../assets/Roboto-Medium.ttf";
import Montserrat from "../assets/Montserrat.ttf";
import RobotoRegular from "../assets/Roboto-Regular.ttf";
// Create styles
Font.register({
  family: "Montserrat",
  format: "truetype",
  src: Montserrat,
});
Font.register({
  family: "Roboto",
  format: "truetype",
  src: RobotoMedium,
});
Font.register({
  family: "Roboto Regular",
  format: "truetype",
  src: RobotoRegular,
});

const pes = 0;

const styles = StyleSheet.create({
  page: {
    flexDirection: "column",
    backgroundColor: "white",
    alignItems: "center",
    paddingLeft: "10%",
    paddingRight: "10%",
  },

  image: {
    height: "auto",
    width: "180px",
    marginTop: "40px",
    marginBottom: "20px",
  },
  title: {
    fontFamily: "Montserrat",
    fontSize: "20px",
  },
  div: {
    display: "flex",
    flexDirection: "column",
    alignSelf: "center",
    textAlign: "center",
    width: "100%",
  },
  header: {
    width: "100%",
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
    textAlign: "left",
    marginTop: "10px",
    marginBottom: "15px",
  },
  header1: {
    width: "100%",
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
    textAlign: "left",
    marginTop: "10px",
    marginBottom: "8px",
  },
  title: {
    fontFamily: "Roboto",
    fontSize: "18px",
  },
  text: {
    fontFamily: "Roboto Regular",
    fontSize: "11px",
  },
  column: {
    display: "flex",
    flexDirection: "row",
    width: "100%",
    justifyContent: "space-between",
  },
  columnTitle: {
    fontFamily: "Roboto",
    fontSize: "13px",
  },
  row: {
    width: "100%",
    height: "15px",
    display: "flex",
    flexDirection: "row",

    justifyContent: "space-between",
    alignItems: "center",
  },
  list: {
    width: "100%",
  },
  columnCont: {
    width: "22%",
  },
  columnContId: {
    width: "12%",
  },
  divider: {
    minWidth: "100%",
    height: "2px",
    backgroundColor: "#000000",
    marginBottom: "20px",
  },
  totalText: {
    fontFamily: "Roboto",
    fontSize: "10px",
  },
  total: {
    width: "100%",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
  },
});

// Create Document Component
const MyDocument = ({ data }) => {
  const { payments, producers, date } = data;
  let MAX = 0;
  let count = 0;
  console.log(producers, payments, date);
  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View>
          <View style={styles.div}>
            <Image source={LOGOpdf} style={styles.image} />
          </View>
        </View>
        <div style={styles.header}>
          <Text style={styles.title}>Daily Closeout</Text>
          <Text style={styles.text}>Payment Date: {date}</Text>
          <Text style={styles.text}>RECEIBED BY (All)</Text>
          <Text style={styles.text}>PAYMENT METHODS (All)</Text>
        </div>
        <div style={styles.list}>
          <div style={styles.column}>
            <div style={styles.columnContId}>
              <Text style={styles.columnTitle}>Id</Text>
            </div>
            <div style={styles.columnCont}>
              <Text style={styles.columnTitle}>Customer</Text>
            </div>
            <div style={styles.columnCont}>
              <Text style={styles.columnTitle}>Date</Text>
            </div>
            <div style={styles.columnCont}>
              <Text style={styles.columnTitle}>Method</Text>
            </div>
            <div style={styles.columnCont}>
              <Text style={styles.columnTitle}>Amount</Text>
            </div>
          </div>
        </div>

        {producers.map((e) => {
          let TOT = 0;
          return (
            <>
              <div style={styles.header1}>
                <Text style={styles.text}>Payment Location: {e.location}</Text>
                <Text style={styles.text}>Received by: {e.name}</Text>
              </div>

              <div style={styles.list}>
                {payments.reverse().map((h) => {
                  if (h.User.name == e.name) {
                    TOT =
                      TOT +
                      (parseFloat(h.amount) + parseFloat(h.creditCardFee));
                    MAX =
                      MAX +
                      (parseFloat(h.amount) + parseFloat(h.creditCardFee));
                    count = count + 1;
                    return (
                      <div style={styles.column}>
                        <div style={styles.columnContId}>
                          <Text style={styles.text}>{h.id}</Text>
                        </div>
                        <div style={styles.columnCont}>
                          <Text style={styles.text}>{h.Client.name}</Text>
                        </div>
                        <div style={styles.columnCont}>
                          <Text style={styles.text}>{h.date}</Text>
                        </div>
                        <div style={styles.columnCont}>
                          <Text style={styles.text}>{h.method}</Text>
                        </div>
                        <div style={styles.columnCont}>
                          <Text style={styles.text}>
                            $
                            {parseFloat(h.amount) + parseFloat(h.creditCardFee)}
                          </Text>
                        </div>
                      </div>
                    );
                  } else return <div></div>;
                })}
                <div style={styles.row}>
                  <Text></Text>
                </div>
              </div>
              <div style={styles.total}>
                <Text style={styles.totalText}>TOTAL </Text>
                <Text style={styles.totalText}>${TOT}</Text>
              </div>
              <div style={styles.divider} />
            </>
          );
        })}
        <div style={styles.total}>
          <Text style={styles.totalText}>GRAND TOTAL: ({count} records)</Text>
          <Text style={styles.totalText}>${MAX}</Text>
        </div>
        <div style={styles.divider} />
      </Page>
    </Document>
  );
};

export default MyDocument;
