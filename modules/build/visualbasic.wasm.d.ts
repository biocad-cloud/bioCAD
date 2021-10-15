/// <reference path="linq.d.ts" />
declare namespace TypeScript {
    interface WebAssembly {
        instantiate(module: Uint8Array, dependencies: object): IWasm;
    }
    interface IWasm {
        instance: WasmInstance;
    }
    interface WasmInstance {
        exports: {
            memory: WasmMemory;
            /**
             * Get object bytes in memory
            */
            MemorySizeOf: (ptr: number) => number;
        };
    }
    interface WasmMemory {
        buffer: ArrayBuffer;
    }
}
declare namespace TypeScript {
    /**
     * The web assembly helper
    */
    module Wasm {
        /**
         * Run the compiled VisualBasic.NET assembly module
         *
         * > This function add javascript ``math`` module as imports object automatic
         *
         * @param module The ``*.wasm`` module file path
         * @param run A action delegate for utilize the VB.NET assembly module
         *
        */
        function RunAssembly(module: string, run: Delegate.Sub, imports?: {}): void;
    }
    class memoryReader {
        protected sizeOf: (obj: number) => number;
        protected buffer: ArrayBuffer;
        constructor(wasm: IWasm);
    }
    class stringReader extends memoryReader {
        private decoder;
        /**
         * @param memory The memory buffer
        */
        constructor(wasm: IWasm);
        /**
         * Read text from WebAssembly memory buffer.
        */
        readTextRaw(offset: number, length: number): string;
        readText(intPtr: number): string;
    }
}
