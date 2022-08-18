import React from "react";
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
Font.register({
  family: "Roboto",
  fonts: [
    {
      src: "https://cdn.jsdelivr.net/npm/open-sans-all@0.1.3/fonts/open-sans-regular.ttf",
    },
    {
      src: "https://cdn.jsdelivr.net/npm/open-sans-all@0.1.3/fonts/open-sans-600.ttf",
      fontWeight: 600,
    },
  ],
});

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
    width: "150px",
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
  div1: {
    display: "flex",
    flexDirection: "row",
    alignSelf: "center",
    textAlign: "center",
  },
  div2: {
    display: "flex",
    flexDirection: "row",
    alignSelf: "center",
    textAlign: "center",
    width: "45%",
    justifyContent: "space-between",
  },
  div3: {
    display: "flex",
    flexDirection: "row",
    alignSelf: "center",
    textAlign: "center",
    width: "90%",
  },
  div4: {
    display: "flex",
    flexDirection: "row",
    alignSelf: "center",
    textAlign: "center",
    width: "60%",
    justifyContent: "space-between",
    marginTop: "20px",
  },
  div5: {
    display: "flex",
    flexDirection: "column",
    alignSelf: "center",
    textAlign: "center",
    width: "85%",
  },
  divFooter: {
    display: "flex",
    flexDirection: "column",
    alignSelf: "center",
    textAlign: "center",
    position: "absolute",
    bottom: "30px",
    width: "100%",
  },
  receipt: {
    fontFamily: "Roboto",
    fontSize: "18px",
    fontWeight: 700,
    textAlign: "center",
    marginTop: "30px",
  },
  client: {
    fontFamily: "Roboto Regular",
    fontSize: "15px",

    textAlign: "center",
    marginBottom: "30px",
    marginTop: "10px",
  },
  total: {
    fontFamily: "Roboto",
    fontSize: "18px",
    fontWeight: 700,
    textAlign: "center",
    marginBottom: "40px",
  },
  total1: {
    fontFamily: "Roboto",
    fontSize: "18px",
    fontWeight: 700,
    textAlign: "center",
    marginBottom: "40px",
  },
  make: {
    fontFamily: "Roboto Regular",
    fontSize: "18px",
    fontWeight: 500,
    textAlign: "center",
  },
  text: {
    fontFamily: "Roboto Regular",
    fontSize: "13px",
    textAlign: "left",
    marginTop: "15px",
  },
  text1: {
    fontFamily: "Roboto",
    fontSize: "10px",
    textAlign: "left",
    marginTop: "15px",
    color: "#E75353",
  },
  producer: {
    fontFamily: "Roboto Regular",
    fontSize: "15px",

    textAlign: "center",
    marginBottom: "10px",
  },
  footer: {
    fontFamily: "Roboto",
    fontSize: "9px",
    textAlign: "center",
  },
});

// Create Document Component
const MyDocument = ({ data }) => {
  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View>
          <View style={styles.div}>
            <Image source={LOGOpdf} style={styles.image} />
          </View>
        </View>
        <View style={styles.div}>
          <Text style={styles.receipt}>Receipt</Text>
          <Text style={styles.client}>{data.client}</Text>
          <View style={styles.div2}>
            <Text style={styles.total}>Total Paid</Text>
            <Text style={styles.total1}>${data.total}</Text>
          </View>
        </View>
        <View style={styles.div}>
          <Text style={styles.make}>
            ¡Make things easier on yourself by bundling your policies!
          </Text>
          <Text style={styles.make}>Auto - Home -Commercial - Health</Text>
        </View>
        <View style={styles.div3}>
          <Text style={styles.text}>
            Insure more than one car with Trueway and you could get a discount
            of up to 30% on most of your car insurance coverages.
          </Text>
        </View>
        <View style={styles.div3}>
          <Text style={styles.text}>
            Insure more than one car with Trueway and you could get a discount
            of up to 30% on most of your car insurance coverages. Trueway
            Insurance has been providing excellent services to the community in
            Florida for many years. Our goal is to establish a lasting
            relationship with our clients, this can only be achieved by
            providing reliable services, while saving hundreds of dollars in
            your Auto, Home and Business insurance.
          </Text>
        </View>
        <View style={styles.div3}>
          <Text style={styles.text}>Thank you for your business!</Text>
        </View>
        <View style={styles.div}>
          <Text style={styles.receipt}>Assisted by</Text>
          <View style={styles.div4}>
            <Text style={styles.producer}>{data.producer}</Text>
            <Text style={styles.producer}>{data.date}</Text>
          </View>
        </View>
        <View style={styles.div5}>
          <Text style={styles.text1}>
            The best compliments you can give us is when you refer a friend or
            family member to us. We value our relationship with and when you
            refer a friend or family member to us we know that you appreciate
            our work and our attitude.
          </Text>
        </View>
        <View style={styles.divFooter}>
          <Text style={styles.footer}>561-318-5540 & 561-223-6595</Text>
          <Text style={styles.footer}>
            3095 S Military trail Suite 12 Lake warth FL 3346
          </Text>
          <Text style={styles.footer}>
            3751 S Congress Ave Palm Spring FL 33461
          </Text>
          <Text style={styles.footer}>customerservice@truewayins.com</Text>
        </View>
      </Page>
    </Document>
  );
};

export default MyDocument;
