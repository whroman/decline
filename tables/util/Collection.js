export default class Collection {

    addMany (arrayToAdd) {
        arrayToAdd.forEach((argument) => {
            this.add(...argument);
        });
    }

}
