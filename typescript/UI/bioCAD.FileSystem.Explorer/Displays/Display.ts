namespace DisplayAdapters {

    export abstract class IDisplay {

        /**
         * Show on a specific div element
         * 
         * @param div The id of the div element
        */
        public abstract show(div: string): void;
    }
}