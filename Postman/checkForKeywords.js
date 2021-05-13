function checkKeywords(array)
{
    for(var i = 0; i < array.length; i++)
    {
       
        if(!( (array[i].includes("Software")) || (array[i].includes("software")) ||(array[i].includes("data science")) ||(array[i].includes("Data Science")) ||(array[i].includes("Data science")) ||(array[i].includes("machine learning")) ||(array[i].includes("Machine Learning")) ||(array[i].includes("Machine learning")) ||(array[i].includes("intern")) ||(array[i].includes("Intern")) ||(array[i].includes("Backend")) ||(array[i].includes("backend"))   (array[i].includes("Frontend")) ||(array[i].includes("frontend")) ||(array[i].includes("ios")) ||(array[i].includes("IOS")) ||(array[i].includes("Android")) ||(array[i].includes("android")) (array[i].includes("flutter"))       ) )
        {
            return false
        }
        
    }
    return true

}
pm.test('Check if Jobs are based on keywords', () => {

    let positions = []
    _.each(pm.response.json(), (item) => {
        positions.push(item.Position)
    })
   
    
       pm.expect(checkKeywords(positions), positions).to.be.true 
       
    })