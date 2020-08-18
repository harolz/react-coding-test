import React from "react";
import { data } from "./data.js";
import { MyModal } from "./modal.js";

import "./App.css";

export default class App extends React.Component {
  state = {
    searchText: "",
    searchCode: "",
    selectedCountry: "",
    countryList: data,
    isShowModal: false,
    isShowSuggestion: true,
  };
  onChange = (input) => {
    this.setState({ searchText: input.target.value });
  };
  handleCodeSelection(e) {
    let { name, value } = e.target;
    this.setState({ searchCode: value }, () =>
      console.log(this.state.searchCode)
    );
  }
  handleItemSelection(e) {
    let { name, value } = e.target;
    this.setState(
      {
        isShowModal: !this.state.isShowModal,
        isShowSuggestion: !this.state.isShowSuggestion,
        selectedCountry: value
      },
      () => console.log(this.state.isShowModalode)
    );
  }
  // componentDidMount() {
  //   fetch('http://127.0.0.1:4000')
  //     .then(response => response.json())
  //     .then(data => this.setState({ data }), ()=>console.log(this.state.data));
  //     // console.log(this.state.data)
  // }
  render() {
    const {
      searchText,
      searchCode,
      countryList,
      isShowSuggestion,
      isShowModal,
    } = this.state;
    const countryListCodes = countryList.map((x) => x.code);

    const filterByName = (list) =>
      list.filter((item) => {
        return item.name.toLowerCase().indexOf(searchText) === 0;
      });

    const filterByCode = (list) =>
      list.filter((item) => {
        return item.code === searchCode;
      });

    return (
      <div className="App">
        <h1>search data using search box</h1>
        <select
          name="codes"
          id="codes"
          className="select-css"
          onChange={(e) => this.handleCodeSelection(e)}
        >
          {" "}
          <option  selected disabled hidden>
            Choose Country Code
          </option>
          {countryListCodes.length > 0 &&
            countryListCodes.map((code) => (
              <option key = {code } value={code}>{code}</option>
            ))}
        </select>
        <input
          className="select-css"
          type="text"
          placeholder="Type Country Name"
          value={searchText}
          onChange={this.onChange}
        />
        {isShowSuggestion &&
          searchText &&
          filterByName(countryList).length > 0 && (
            <h1>`Search results for ${searchText}`</h1>
          )}
        {isShowSuggestion &&
          !searchCode &&
          searchText &&
          filterByName(countryList).length > 0 && (
            <div className="autocomplete">
              {filterByName(countryList).map((item) => (
                <option
                  key={item.code}
                  value={item.name}
                  onMouseDown={this.handleItemSelection.bind(this)}
                >
                  {" "}
                  {/* <h3> */}
                  {item.name}
                  {item.code}
                  {/* </h3> */}
                </option>
              ))}
            </div>
          )}
        {isShowSuggestion &&
          searchCode &&
          searchText &&
          filterByName(countryList).length > 0 && (
            <div className="autocomplete">
              {filterByName(filterByCode(countryList)).map((item) => (
                <option
                  key={item.code}
                  // value={item.name}
                  onMouseDown={this.handleItemSelection.bind(this)}
                >
                  {" "}
                  {/* <h3> */}
                  {item.name}
                  {item.code}
                  {/* </h3> */}
                </option>
              ))}
            </div>
          )}
        {isShowModal && (
          <MyModal
            countryName={this.state.selectedCountry}
            closeModal={() =>
              this.setState({
                isShowModal: false,
                searchText: "",
                isShowSuggestion: true,
              })
            }
          />
        )}
      </div>
    );
  }
}
