import { promises as fs } from "fs";
import * as path from "path";

interface IJsonData {
    layers: ILayer[];
}

interface ILayer {
    index: number;
    stones: IStone[];
}

interface IStone {
    x: string;
    y: string;
}

type TResult = {
    [filename: string]: {
        layers: {
            index: number;
            stoneCount: number;
        }[];
    };
};

const readJsonFilesInFolder = async (folderPath: string) => {
    const result: TResult = {};

    try {
        const files = await fs.readdir(folderPath);

        for (const file of files) {
            const filePath = path.join(folderPath, file);

            if (path.extname(file) !== ".json") continue;

            try {
                const data = await fs.readFile(filePath, "utf8");
                const jsonData = JSON.parse(data) as IJsonData;

                result[file] = {
                    layers: jsonData.layers.map((layer) => {
                        return {
                            index: layer.index,
                            stoneCount: layer.stones.length,
                        };
                    }),
                };
            } catch (err) {
                console.error(`Error reading or parsing file ${file}:`, err);
            }
        }
    } catch (err) {
        console.error("Error reading directory:", err);
    }

    return result;
};

const writeObjectToJsonFile = async (filePath: string, obj: object) => {
    try {
        const jsonString = JSON.stringify(obj, null, 2); // Convert object to JSON string
        await fs.writeFile(filePath, jsonString, "utf8"); // Write JSON string to file
        console.log(`Successfully wrote to ${filePath}`);
    } catch (err) {
        console.error("Error writing to file:", err);
    }
};

const renameTxtFilesToJson = async (folderPath: string) => {
    try {
        const files = await fs.readdir(folderPath);

        for (const file of files) {
            const filePath = path.join(folderPath, file);

            if (path.extname(file) !== ".txt") continue;

            const newFilePath = path.join(
                folderPath,
                path.basename(file, ".txt") + ".json"
            );
            try {
                await fs.rename(filePath, newFilePath);
                console.log(`Renamed ${file} to ${path.basename(newFilePath)}`);
            } catch (err) {
                console.error(`Error renaming file ${file}:`, err);
            }
        }
    } catch (err) {
        console.error("Error reading directory:", err);
    }
};

const main = async () => {
    await renameTxtFilesToJson("./levels");
    const result = await readJsonFilesInFolder("./levels");
    const filePath = path.join("./output", "output.json");

    await writeObjectToJsonFile(filePath, result);
};

main();
