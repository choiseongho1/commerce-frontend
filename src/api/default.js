const API_URL = "/default";

export default ({ $axios }) => {
  const findSearchCardList = async (linkUrl, params) => {
    let url = linkUrl;
    if (stringUtil.isEmpty(linkUrl)) {
      url = `${API_URL}/card`;
      return await $axios.get(url, { params });
    }
    return await $axios.get(url);
  };

  const findSearchDetail = async (params) => {
    const linkUrl = `${API_URL}/${params}`;

    return await $axios.get(linkUrl, params);
  };

  return {
    findSearchCardList,
    findSearchDetail,
  };
};
