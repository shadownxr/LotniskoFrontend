import React from "react";
import ReactDOM from "react-dom";
import scriptLoader from "react-async-script-loader";
import Cookie from 'react-cookies';

 const CLIENT = {
   sandbox:
     "AbaJcSJM0rf6lfDUVozyEfeq-I_b1o9t7TGH07bQm082Cgtp4l_VnO7oIEFjCkAvXrKND7pVH9mvyAAD",
   production:
     "your_production_key"
 };

 const CLIENT_ID =
   process.env.NODE_ENV === "production" ? CLIENT.production : CLIENT.sandbox;

let PayPalButton = null;
class PaypalButton extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      showButtons: false,
      loading: true,
      paid: false
    };

    window.React = React;
    window.ReactDOM = ReactDOM;
  }

  fetchBuy = () => {
    let payload = {
        "flightId": this.props.flightId,
        "userId": this.props.accountData.id,
        "ticketClass": this.props.ticketClass,
        "paid": false
    }

    console.log(payload);

    const url = "http://localhost:8080/api/tickets/add";

    const options = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          'Authorization': 'Bearer ' + Cookie.load('userToken').token,
        },
        body: JSON.stringify(payload),
    };

    fetch(url, options)
      .then(response => response.json())
      .then(result => {
        console.log(result);
        this.props.close(false);
      });
  }

  handleBuy = () => {
      this.fetchBuy();
  }

  componentDidMount() {
    const { isScriptLoaded, isScriptLoadSucceed } = this.props;

    if (isScriptLoaded && isScriptLoadSucceed) {
      PayPalButton = window.paypal.Buttons.driver("react", { React, ReactDOM });
      this.setState({ loading: false, showButtons: true });
    }
  }

  componentWillReceiveProps(nextProps) {
    const { isScriptLoaded, isScriptLoadSucceed } = nextProps;

    const scriptJustLoaded =
      !this.state.showButtons && !this.props.isScriptLoaded && isScriptLoaded;

    if (scriptJustLoaded) {
      if (isScriptLoadSucceed) {
        PayPalButton = window.paypal.Buttons.driver("react", {
          React,
          ReactDOM
        });
        this.setState({ loading: false, showButtons: true });
      }
    }
  }

  createOrder = (data, actions) => {
    return actions.order.create({
      purchase_units: [
        {
          description: "FlightID: "+ this.props.flightId +" Name: "+ this.props.accountData.name +" Surename: "+this.props.accountData.surename,
          amount: {
            currency_code: "USD",
            value: this.props.flightCost
          }
        }
      ]
    });
  };

  onApprove = (data, actions) => {
    actions.order.capture().then(details => {
      const paymentData = {
        payerID: data.payerID,
        orderID: data.orderID
      };
      console.log("Payment Approved: ", paymentData);
      this.handleBuy();
      this.setState({ showButtons: false, paid: true });
    });
  };

  render() {
    const { showButtons, loading, paid } = this.state;

    return (
      <div className="main">
        {loading && (<div>Loading...</div>)}

        {showButtons && (
          <div>
            <PayPalButton
              createOrder={(data, actions) => this.createOrder(data, actions)}
              onApprove={(data, actions) => this.onApprove(data, actions)}
            />
          </div>
        )}

        {paid && (
          <div className="main">

          </div>
        )}
      </div>
    );
  }
}


 export default scriptLoader(`https://www.paypal.com/sdk/js?client-id=${CLIENT_ID}`)(PaypalButton);