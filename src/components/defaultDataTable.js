import React from "react";
import "../styles/defaultDataTable.css";

export default class DefaultDataTable extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      jsonResult: []
    };
  }

  componentDidMount() {
    this.GetDefaultLayoutData();
  }

  GetDefaultLayoutData() {
    this.FetchFromApi(
      "http://omahaproxy.appspot.com/all.json",
      "get",
      "json"
    ).then(results => {
      this.GetChromedriverApiData();
      return this.setState({ jsonResult: results });
    });
  }

  GetChromedriverApiData() {
    this.FetchFromApi(
      "http://storage.googleapis.com/chromedriver/",
      "get",
      "xml"
    ).then(results => console.log("Results", results));
  }

  FetchFromApi(url, httpRequestType, payLoadType) {
    return fetch(url, { method: httpRequestType })
      .then(res => {
        if (payLoadType === "json") {
          return res.json();
        } else {
          return res.text();
        }
      })
      .then(results => {
        return results;
        // if (payLoadType === "json") {
        //   return results;
        // } else {
        //   return new DOMParser().parseFromString(results, "text/xml");
        // }
      });
  }

  BuildChannels(os, versions) {
    const expandedVersion = versions.map((item, index) => {
      return (
        <tr>
          {(() => {
            if (index === 0) return <td rowSpan={versions.length}>{os}</td>;
          })()}
          <td>{item.channel}</td>
          <td>{item.current_version}</td>
          <td>{item.previous_version}</td>
          <td>{item.current_reldate}</td>
          <td>{item.previous_reldate}</td>
          <td>-</td>
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
    console.log(this.state.jsonResult);

    const persons = (
      <div>
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

    return (
      <div id="layout-content" className="layout-content-wrapper">
        <div className="panel-list">{persons}</div>
      </div>
    );
  }
}
