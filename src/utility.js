class Utility{

    /**
     * This function sorts the list of countries using QuickSort based on their population
     * @param populationList The list of all countries. It should contain a population attribute
     * @returns A sorted list of the given populationList
     */
    static quickSort(populationList) {
        if (populationList.length <= 1) {
            return populationList;
        }
        let pivot = populationList[0];
        let left = [];
        let right = [];
        for (let i = 1; i < populationList.length; i++) {
            populationList[i].population < pivot.population ? left.push(populationList[i]) : right.push(populationList[i]);
        }
        return this.quickSort(left).concat(pivot, this.quickSort(right));
    };

    /**
     * Function to filter the sorted country list based on binary search
     * @param allCountries Array of all countries sorted based on population
     * @param populationLimit Limit based of which we want to filter the list
     * @returns An array of the filtered list based of the populationLimit
     */
    static filterResults(allCountries, populationLimit){
        let start = 0;
        let mid;
        let end = allCountries.length - 1
        if (populationLimit === 0){
            return allCountries
        }
        if (populationLimit < 0){
            return allCountries
        }
        while(start<=end){
            mid = Math.floor((start + end)/2)
            if (allCountries[mid].population <= populationLimit &&
                allCountries[mid + 1].population > populationLimit){
                return allCountries.slice(mid + 1,allCountries.length)
            }
            else if(allCountries[mid].population <= populationLimit &&
                allCountries[mid + 1].population <= populationLimit){
                start = mid + 1
            }
            else{
                end = mid - 1
            }
        }
        return null


    }
}

export default Utility;