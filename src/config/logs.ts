// Disable console.log in prod apps
if (!__DEV__) {
  console.log('NOT DEV');
  //console.log = () => {};
}

export default {};
