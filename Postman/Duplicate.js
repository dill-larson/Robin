function duplicates (array) {
    return array.length === new Set(array).size;
  }
  
  pm.test('Check if Job position is unique', () => {
      let jobDetail
      let jobDetailsArray = []
      _.each(pm.response.json(), (item) => {
          jobDetail = item.Company + item.Position + item.Time
          jobDetailsArray.push(jobDetail)
      })
  
      pm.expect(duplicates(jobDetailsArray), jobDetailsArray).to.be.true
  })