import { users, tasks, type User, type Task, type InsertUser, type InsertTask, type UpdateTask } from "@shared/schema";

export interface IStorage {
  // User methods
  getUser(id: string): Promise<User | undefined>;
  getUserByEmail(email: string): Promise<User | undefined>;
  upsertUser(user: InsertUser): Promise<User>;
  
  // Task methods
  getAllTasks(): Promise<Task[]>;
  getTask(id: number): Promise<Task | undefined>;
  getTasksByOwner(ownerId: string): Promise<Task[]>;
  getTasksBySharedUser(email: string): Promise<Task[]>;
  createTask(task: InsertTask): Promise<Task>;
  updateTask(id: number, updates: UpdateTask): Promise<Task | undefined>;
  deleteTask(id: number): Promise<boolean>;
}

export class MemStorage implements IStorage {
  private users: Map<string, User>;
  private tasks: Map<number, Task>;
  private currentTaskId: number;

  constructor() {
    this.users = new Map();
    this.tasks = new Map();
    this.currentTaskId = 1;
    
    // Add some sample data for demonstration
    this.initSampleData();
  }

  private initSampleData() {
    // Sample user
    const sampleUser: User = {
      id: "sample-user-id",
      email: "demo@example.com",
      name: "Demo User",
      avatarUrl: null,
      createdAt: new Date(),
    };
    this.users.set(sampleUser.id, sampleUser);

    // Sample tasks
    const sampleTasks: Task[] = [
      {
        id: 1,
        title: "Complete project documentation",
        description: "Write comprehensive documentation for the new feature release",
        priority: "high",
        status: "pending",
        dueDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 7 days from now
        ownerId: sampleUser.id,
        sharedWith: [],
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 2,
        title: "Review pull requests",
        description: "Review and merge pending pull requests from team members",
        priority: "medium",
        status: "pending",
        dueDate: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000), // 3 days from now
        ownerId: sampleUser.id,
        sharedWith: ["john@example.com"],
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 3,
        title: "Update website copy",
        description: "Update the marketing copy on the landing page",
        priority: "low",
        status: "completed",
        dueDate: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000), // 2 days ago
        ownerId: sampleUser.id,
        sharedWith: [],
        createdAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000),
        updatedAt: new Date(),
      },
    ];

    sampleTasks.forEach(task => {
      this.tasks.set(task.id, task);
      this.currentTaskId = Math.max(this.currentTaskId, task.id + 1);
    });
  }

  // User methods
  async getUser(id: string): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByEmail(email: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(user => user.email === email);
  }

  async upsertUser(userData: InsertUser): Promise<User> {
    const existingUser = this.users.get(userData.id);
    
    if (existingUser) {
      // Update existing user
      const updatedUser: User = {
        ...existingUser,
        ...userData,
        avatarUrl: userData.avatarUrl || null,
      };
      this.users.set(userData.id, updatedUser);
      return updatedUser;
    } else {
      // Create new user
      const newUser: User = {
        ...userData,
        avatarUrl: userData.avatarUrl || null,
        createdAt: new Date(),
      };
      this.users.set(userData.id, newUser);
      return newUser;
    }
  }

  // Task methods
  async getAllTasks(): Promise<Task[]> {
    return Array.from(this.tasks.values()).sort((a, b) => 
      b.createdAt.getTime() - a.createdAt.getTime()
    );
  }

  async getTask(id: number): Promise<Task | undefined> {
    return this.tasks.get(id);
  }

  async getTasksByOwner(ownerId: string): Promise<Task[]> {
    return Array.from(this.tasks.values())
      .filter(task => task.ownerId === ownerId)
      .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
  }

  async getTasksBySharedUser(email: string): Promise<Task[]> {
    return Array.from(this.tasks.values())
      .filter(task => task.sharedWith?.includes(email))
      .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
  }

  async createTask(taskData: InsertTask): Promise<Task> {
    const id = this.currentTaskId++;
    const now = new Date();
    
    const task: Task = {
      ...taskData,
      id,
      description: taskData.description || null,
      priority: taskData.priority || "medium",
      status: taskData.status || "pending",
      dueDate: taskData.dueDate || null,
      sharedWith: taskData.sharedWith || [],
      createdAt: now,
      updatedAt: now,
    };
    
    this.tasks.set(id, task);
    return task;
  }

  async updateTask(id: number, updates: UpdateTask): Promise<Task | undefined> {
    const existingTask = this.tasks.get(id);
    if (!existingTask) {
      return undefined;
    }

    const updatedTask: Task = {
      ...existingTask,
      ...updates,
      updatedAt: new Date(),
    };
    
    this.tasks.set(id, updatedTask);
    return updatedTask;
  }

  async deleteTask(id: number): Promise<boolean> {
    return this.tasks.delete(id);
  }
}

export const storage = new MemStorage();
