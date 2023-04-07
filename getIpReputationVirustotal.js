const axios = require('axios');
require('dotenv').config();
const API_TOKEN = process.env.SECRET_KEY;

const BASE_URL = "https://www.virustotal.com";
const endpoint = '/api/v3/ip_addresses/';
const log = {ip: '61.177.173.52'};
const config = {
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      "x-apikey": API_TOKEN,
    },
};

function getIP(ip_address) {
    return axios.get(BASE_URL + endpoint + ip_address, config)
        .then(function (response) {
            const blacklistResults = [];
            const analysisResults = response.data.data.attributes.last_analysis_results;
            for (const engineName in analysisResults) {
                if (analysisResults[engineName].method === 'blacklist') {
                    blacklistResults.push({
                        engine_name: engineName,
                        category: analysisResults[engineName].category,
                        result: analysisResults[engineName].result
                    });
                }
            }
            const data = {
                region: response.data.data.attributes.regional_internet_registry,
                network: response.data.data.attributes.network,
                analysis: blacklistResults
            };

            return data;
        })
        .catch(function (error) {
            console.error(error);
            return null;
        });
};

getIP(log.ip).then(function (data) {
    console.log(data);
});
