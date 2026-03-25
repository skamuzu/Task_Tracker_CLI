#!/usr/bin/env tsx

import type { PathLike } from "fs";
import fsPromises from "fs/promises";
import path from "path";


// types
type Task = {
  id: number;
  description: string;
  status: Status;
  createdAt: Date;
  updatedAt: Date;
};

type Status = "todo" | "in-progress" | "done";


//constants
const file = path.join(import.meta.dirname, "tasks.json");
const initialData = JSON.stringify([]);
const argv = process.argv.slice(2);


//file creation
const fileExists = async (filePath: PathLike) => {
  try {
    await fsPromises.access(filePath);
    return true;
  } catch {
    return false;
  }
};

const getOrCreateFile = async (filePath: PathLike) => {
  const exists = await fileExists(filePath);
  if (exists) {
    return;
  } else {
    await fsPromises.writeFile(filePath, initialData);
  }
};

await getOrCreateFile(file);


//file operations
async function add(filePath: PathLike, description: string) {
  const data = await fsPromises.readFile(filePath, "utf-8");
  const parsedData: Task[] = JSON.parse(data);
  const task: Task = {
    id: parsedData.length ? Math.max(...parsedData.map((t) => t.id) ?? 0) + 1 : 1,
    description: description,
    status: "todo",
    createdAt: new Date(),
    updatedAt: new Date(),
  };
  parsedData.unshift(task);
  await fsPromises.writeFile(filePath, JSON.stringify(parsedData));
  console.log(`Task added successfully (ID: ${task.id})`);
}

async function updateDescription(
  filePath: PathLike,
  id: string,
  description: string,
) {
  const data = await fsPromises.readFile(filePath, "utf-8");
  const parsedData: Task[] = JSON.parse(data);
  const task = parsedData.find((task) => task.id == +id);
  if (task) {
    task.description = description;
    task.updatedAt = new Date();
  } else console.log("Not found");
  await fsPromises.writeFile(filePath, JSON.stringify(parsedData));
  console.log(`Task updated successfully (ID:${task?.id})`);
}

async function updateStatus(filePath: PathLike, id: string, status: Status) {
  const data = await fsPromises.readFile(filePath, "utf-8");
  const parsedData: Task[] = JSON.parse(data);
  const task = parsedData.find((task) => (task.id == +id));
  if (task) {
    task.status = status as Status;
  }
  else console.log("Not found");
  await fsPromises.writeFile(filePath, JSON.stringify(parsedData));
  console.log(`Task updated successfully (ID:${task?.id})`);
}

async function remove(filePath: PathLike, id: string) {
  const data = await fsPromises.readFile(filePath, "utf-8");
  const parsedData: Task[] = JSON.parse(data);
  const filteredData = parsedData.filter((task) => task.id != +id);
  await fsPromises.writeFile(filePath, JSON.stringify(filteredData));
  console.log(`Task deleted successfully (ID:${id})`);
}

async function list(filePath: PathLike, status?: Status) {
  const data = await fsPromises.readFile(filePath, "utf-8");
  const parsedData: Task[] = JSON.parse(data);
  console.log("ID:", "Description", "-", "Status");
  if (status) {
    const listData = parsedData
      .filter((task) => task.status == status)
      .sort((a, b) => a.id - b.id);
    listData.map((task) =>
      console.log(
        `${task.id}: ${task.description} - ${task.status.toUpperCase()}`,
      ),
    );
  } else {
    parsedData
      .sort((a, b) => a.id - b.id)
      .map((task) =>
        console.log(
          `${task.id}: ${task.description} - ${task.status.toUpperCase()}`,
        ),
      );
  }
}


switch (argv[0]) {
  case "add":
    await add(file, argv[1] as string);
    break;
  case "update":
    await updateDescription(file, argv[1] as string, argv[2] as string);
    break;
  case "delete":
    await remove(file, argv[1] as string);
    break;
  case "list":
    if (argv[2]) await list(file, argv[2] as Status);
    else await list(file);
    break;
  case "mark-in-progress":
    await updateStatus(file, argv[1] as string, "in-progress");
    break;
  case "mark-done":
    await updateStatus(file, argv[1] as string, "done");
    break;
}

process.exit(0);
