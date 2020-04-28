import { xml2json } from "xml-js";

const FetchFromApi = (url, httpRequestType, payLoadType) => {
  return fetch(url, { method: httpRequestType })
    .then(res => {
      if (payLoadType === "json") {
        return res.json();
      } else {
        return res.text();
      }
    })
    .then(results => {
      if (payLoadType !== "xml") {
        return results;
      } else {
        return xml2json(results, { compact: true, spaces: 4 });
        // return new DOMParser().parseFromString(results, "text/xml");
      }
    });
};

const SearchChromeDriver = chromeVersion => {
  const chromeVersionFromSearch =
    chromeVersion.indexOf(".") !== -1
      ? Number(chromeVersion.substr(0, chromeVersion.indexOf(".")))
      : Number(chromeVersion);

  if (chromeVersionFromSearch < 70) {
    console.log(ReturnChromedriverForLegacyChrome(chromeVersionFromSearch));
  } else {
    let url = `https://cors-anywhere.herokuapp.com/https://chromedriver.storage.googleapis.com/LATEST_RELEASE_${chromeVersionFromSearch}`;
    FetchFromApi(url, "GET", "text").then(result => {
      console.log(result);
    });
  }
};

const ReturnChromedriverForLegacyChrome = chromeVersionFromSearch => {
  return "legacy";
  // <div className="container">
  //   <table>
  //     <thead>
  //       <tr>
  //         <th>Chrome Version Range</th>
  //         <th>Chromedriver</th>
  //       </tr>
  //     </thead>
  //     <tbody>
  //       <tr>
  //         <td>71-73</td>
  //         <td>2.46</td>
  //       </tr>
  //       <tr>
  //         <td>70-72</td>
  //         <td>2.45</td>
  //       </tr>
  //       <tr>
  //         <td>69-71</td>
  //         <td>2.44</td>
  //       </tr>
  //       <tr>
  //         <td>69-71</td>
  //         <td>2.43</td>
  //       </tr>
  //       <tr>
  //         <td>68-70</td>
  //         <td>2.42</td>
  //       </tr>
  //       <tr>
  //         <td>67-69</td>
  //         <td>2.41</td>
  //       </tr>
  //       <tr>
  //         <td>66-68</td>
  //         <td>2.40</td>
  //       </tr>
  //       <tr>
  //         <td>66-68</td>
  //         <td>2.39</td>
  //       </tr>
  //       <tr>
  //         <td>65-67</td>
  //         <td>2.38</td>
  //       </tr>
  //       <tr>
  //         <td>64-66</td>
  //         <td>2.37</td>
  //       </tr>
  //       <tr>
  //         <td>63-65</td>
  //         <td>2.36</td>
  //       </tr>
  //       <tr>
  //         <td>62-64</td>
  //         <td>2.35</td>
  //       </tr>
  //       <tr>
  //         <td>61-63</td>
  //         <td>2.34</td>
  //       </tr>
  //       <tr>
  //         <td>60-62</td>
  //         <td>2.33</td>
  //       </tr>
  //       <tr>
  //         <td>57-59</td>
  //         <td>2.28</td>
  //       </tr>
  //       <tr>
  //         <td>54-56</td>
  //         <td>2.25</td>
  //       </tr>
  //       <tr>
  //         <td>53</td>
  //         <td>2.24</td>
  //       </tr>
  //       <tr>
  //         <td>51-52</td>
  //         <td>2.22</td>
  //       </tr>
  //       <tr>
  //         <td>44-50</td>
  //         <td>2.19</td>
  //       </tr>
  //       <tr>
  //         <td>42-43</td>
  //         <td>2.15</td>
  //       </tr>
  //     </tbody>
  //   </table>
  // </div>
};

export default SearchChromeDriver;
