import React from "react";
import Loader from "react-loader-spinner";
import { xml2json } from "xml-js";
import "../styles/defaultDataTable.css";

export default class DefaultDataTable extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      jsonResult: [],
      chromedriversMapping: {},
    };
  }

  componentDidMount() {
    this.GetDefaultLayoutData();
  }

  GetDefaultLayoutData() {
    this.FetchFromApi(
      // "https://cors-anywhere.herokuapp.com/http://omahaproxy.appspot.com/all.json",
      "https://heuristic-jones-0c9de7.netlify.app/.netlify/functions/app/getChromeChannels",
      "get",
      "json"
    )
      .then((results) => {
        this.setState({ jsonResult: JSON.parse(results) });
        return this.GetChromedriverApiData();
      })
      .then((jsonFromXml) => {
        this.setState({ loading: false });
        let allKeys = jsonFromXml.reduce((acc, item) => {
          acc.add(item.Key._text.substr(0, item.Key._text.indexOf("/")));
          return acc;
        }, new Set());
        return allKeys;
      })
      .then((allChromeDriversArray) => {
        let jsonResultArray = this.state.jsonResult;
        let jsonResultArrayReduced = jsonResultArray.reduce(
          (accumulator, item) => {
            let jsonResultArrayItemReduced = item.versions.reduce(
              (acc, versionObj) => {
                let { current_version } = versionObj;
                let temp = {};
                const subStrChromeVer = versionObj.current_version.substr(
                  0,
                  versionObj.current_version.lastIndexOf(".")
                );
                temp[current_version] = this.GetChromeDriverValue(
                  Array.from(allChromeDriversArray),
                  subStrChromeVer
                );
                acc = { ...acc, ...temp };
                return acc;
              },
              {}
            );
            accumulator = { ...accumulator, ...jsonResultArrayItemReduced };
            return accumulator;
          },
          {}
        );
        return jsonResultArrayReduced;
      })
      .then((chromedriverChromebrowserArray) => {
        this.setState({ chromedriversMapping: chromedriverChromebrowserArray });
      });
  }

  GetChromeDriverValue(allChromeDriversArray, subStrChromeVer) {
    let chromeDriver;
    let current_version = subStrChromeVer;
    let count = 0;
    do {
      chromeDriver = this.GetChromeDriverMapping(
        allChromeDriversArray,
        current_version
      );
      if (!chromeDriver) {
        current_version = current_version.substr(
          0,
          current_version.indexOf(".")
        );
        current_version = current_version - 1 + ".";
      }
      count++;
    } while (!chromeDriver && count < 10);
    return chromeDriver;
  }

  GetChromeDriverMapping(allChromeDriversArray, subStrChromeVer) {
    let chromeDriver;

    for (let i = 0; i < allChromeDriversArray.length; i++) {
      const input = new RegExp(`^${subStrChromeVer}`);

      if (input.test(allChromeDriversArray[i])) {
        chromeDriver = allChromeDriversArray[i];
      }
    }
    return chromeDriver;
  }

  GetChromedriverApiData() {
    return this.FetchFromApi(
      // "https://cors-anywhere.herokuapp.com/http://storage.googleapis.com/chromedriver/",
      "https://heuristic-jones-0c9de7.netlify.app/.netlify/functions/app/getChromedrivers",
      "get",
      "xml"
    ).then((results) => {
      return JSON.parse(results).ListBucketResult.Contents;
    });
  }

  FetchFromApi(url, httpRequestType, payLoadType) {
    return fetch(url, { method: httpRequestType })
      .then((res) => {
        return res.json();
      })
      .then((results) => {
        if (payLoadType === "json") {
          return results.body;
        } else {
          return xml2json(results.body, { compact: true, spaces: 4 });
          // return new DOMParser().parseFromString(results, "text/xml");
        }
      });
  }

  BuildChannels(os, versions) {
    const expandedVersion = versions.map((item, index) => {
      return (
        <tr key={`${os}${index}`}>
          {(() => {
            if (index === 0) return <td rowSpan={versions.length}>{os}</td>;
          })()}
          <td>{item.channel}</td>
          <td>{item.current_version}</td>
          <td>{item.previous_version}</td>
          <td>{item.current_reldate}</td>
          <td>{item.previous_reldate}</td>
          <td>
            {item.channel.includes("canary")
              ? "Chromedriver support not available. Use chrome executable directly."
              : this.state.chromedriversMapping[item.current_version]}
          </td>
        </tr>
      );
    });
    return expandedVersion;
  }

  BuildTableBody() {
    const persons = this.state.jsonResult.map((item, i) => {
      return this.BuildChannels(item.os, item.versions);
    });
    return persons;
  }

  render() {
    const dataTable = (
      <div className="container">
        <table>
          <thead>
            <tr>
              <th>OS</th>
              <th>Channel</th>
              <th>Current Version</th>
              <th>Previous Version</th>
              <th>Current Release Date</th>
              <th>Previous Release Date</th>
              <th>ChromeDriver Version</th>
            </tr>
          </thead>
          <tbody>{this.BuildTableBody()}</tbody>
        </table>
      </div>
    );

    if (this.state.loading) {
      return (
        <div
          style={{
            width: "100%",
            height: "100",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
          className="spinner-border text-primary"
          role="status"
        >
          <Loader type="ThreeDots" color="#2BAD60" height="100" width="100" />
        </div>
      );
    } else {
      return (
        <div id="layout-content" className="layout-content-wrapper">
          <div className="panel-list">{dataTable}</div>
        </div>
      );
    }
  }
}
