class Utility{

    static quicksort(population_list) {
        if (population_list.length <= 1) {
            return population_list;
        }
        let pivot = population_list[0];
        let left = [];
        let right = [];
        for (let i = 1; i < population_list.length; i++) {
            population_list[i].population < pivot.population ? left.push(population_list[i]) : right.push(population_list[i]);
        }
        return this.quicksort(left).concat(pivot, this.quicksort(right));
    };

    static filter_results(all_countries,population_limit){
        let start = 0;
        let mid;
        let end = all_countries.length - 1
        if (population_limit == 0){
            return all_countries
        }
        while(start<=end){
            mid = Math.floor((start + end)/2)
            if (all_countries[mid].population <= population_limit &&
                all_countries[mid + 1].population > population_limit){
                return all_countries.slice(mid + 1,all_countries.length)
            }
            else if(all_countries[mid].population <= population_limit &&
                all_countries[mid + 1].population <= population_limit){
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