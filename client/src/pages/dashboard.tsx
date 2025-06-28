import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Moon, Sun, LogOut, Filter } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useAuth } from '@/hooks/useAuth';
import { useTasks } from '@/hooks/useTasks';
import { useTheme } from '@/components/ThemeProvider';
import { Task } from '@shared/schema';
import TaskCard from '@/components/TaskCard';
import TaskModal from '@/components/TaskModal';
import TaskDetailModal from '@/components/TaskDetailModal';
import CongratsModal from '@/components/CongratsModal';

import { triggerConfetti } from '@/components/ui/confetti';

type FilterType = 'all' | 'today' | 'overdue' | 'completed';

const Dashboard: React.FC = () => {
  const { user, signOut } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const {
    tasks,
    isLoading,
    createTask,
    updateTask,
    deleteTask,
    completeTask,
    isCreating,
    isUpdating,
    isDeleting,
  } = useTasks();

  const [isTaskModalOpen, setIsTaskModalOpen] = useState(false);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
  const [isCongratsModalOpen, setIsCongratsModalOpen] = useState(false);
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);
  const [editingTask, setEditingTask] = useState<Task | null>(null);
  const [currentFilter, setCurrentFilter] = useState<FilterType>('all');

  const filteredTasks = useMemo(() => {
    const now = new Date();
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const tomorrow = new Date(today.getTime() + 24 * 60 * 60 * 1000);

    switch (currentFilter) {
      case 'today':
        return tasks.filter((task) => {
          if (!task.dueDate) return false;
          const dueDate = new Date(task.dueDate);
          return dueDate >= today && dueDate < tomorrow;
        });
      case 'overdue':
        return tasks.filter((task) => {
          if (!task.dueDate || task.status === 'completed') return false;
          return new Date(task.dueDate) < today;
        });
      case 'completed':
        return tasks.filter((task) => task.status === 'completed');
      default:
        return tasks;
    }
  }, [tasks, currentFilter]);

  const handleCreateTask = async (taskData: any) => {
    await createTask(taskData);
    setIsTaskModalOpen(false);
  };

  const handleUpdateTask = async (taskData: any) => {
    if (editingTask) {
      await updateTask({ id: editingTask.id, ...taskData });
      setIsTaskModalOpen(false);
      setEditingTask(null);
    }
  };

  const handleCompleteTask = async (taskId: number) => {
    const task = tasks.find((t) => t.id === taskId);
    if (!task) return;

    const isCurrentlyCompleted = task.status === 'completed';
    const newCompletedStatus = !isCurrentlyCompleted;
    
    await completeTask({ id: taskId, completed: newCompletedStatus });

    if (newCompletedStatus === true) {
      // Task was just completed
      await triggerConfetti();
      setIsCongratsModalOpen(true);
    }
  };

  const handleTaskDetail = (taskId: number) => {
    const task = tasks.find((t) => t.id === taskId);
    if (task) {
      setSelectedTask(task);
      setIsDetailModalOpen(true);
    }
  };

  const handleEditTask = () => {
    if (selectedTask) {
      setEditingTask(selectedTask);
      setIsDetailModalOpen(false);
      setIsTaskModalOpen(true);
    }
  };

  const handleDeleteTask = async () => {
    if (selectedTask) {
      if (window.confirm('Are you sure you want to delete this task?')) {
        await deleteTask(selectedTask.id);
        setIsDetailModalOpen(false);
        setSelectedTask(null);
      }
    }
  };

  const filters = [
    { key: 'all' as FilterType, label: 'All Tasks', count: tasks.length },
    {
      key: 'today' as FilterType,
      label: 'Today',
      count: tasks.filter((t) => {
        if (!t.dueDate) return false;
        const today = new Date();
        const taskDate = new Date(t.dueDate);
        return taskDate.toDateString() === today.toDateString();
      }).length,
    },
    {
      key: 'overdue' as FilterType,
      label: 'Overdue',
      count: tasks.filter((t) => {
        if (!t.dueDate || t.status === 'completed') return false;
        return new Date(t.dueDate) < new Date();
      }).length,
    },
    {
      key: 'completed' as FilterType,
      label: 'Completed',
      count: tasks.filter((t) => t.status === 'completed').length,
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-indigo-900">


      {/* Navigation Header */}
      <nav className="sticky top-0 z-40 backdrop-blur-lg bg-white/80 dark:bg-gray-900/80 border-b border-gray-200/50 dark:border-gray-700/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo and Title */}
            <motion.div
              className="flex items-center gap-3"
              initial={{ opacity: 0, x: -20, rotateY: -90 }}
              animate={{ opacity: 1, x: 0, rotateY: 0 }}
              transition={{ duration: 0.8, type: "spring" }}
            >
              <motion.div
                className="w-12 h-12 bg-gradient-to-r from-primary via-purple-500 to-purple-600 rounded-2xl flex items-center justify-center relative shadow-2xl"
                animate={{
                  y: [0, -4, 0],
                  rotateY: [0, 360],
                  boxShadow: [
                    "0 10px 30px rgba(139, 92, 246, 0.3)",
                    "0 15px 40px rgba(139, 92, 246, 0.6)",
                    "0 10px 30px rgba(139, 92, 246, 0.3)"
                  ]
                }}
                transition={{
                  y: { duration: 3, repeat: Infinity, repeatType: 'reverse' },
                  rotateY: { duration: 8, repeat: Infinity, ease: "linear" },
                  boxShadow: { duration: 2, repeat: Infinity }
                }}
                style={{ transformStyle: "preserve-3d" }}
              >
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent rounded-2xl"
                  animate={{ rotate: [0, 360] }}
                  transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                />
                <i className="fas fa-check-double text-white text-xl relative z-10" />
              </motion.div>
              <motion.h1 
                className="text-3xl font-bold bg-gradient-to-r from-primary via-purple-500 to-purple-600 bg-clip-text text-transparent"
                animate={{
                  backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"]
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "linear"
                }}
                style={{
                  backgroundSize: "200% 200%"
                }}
              >
                Donezo
              </motion.h1>
            </motion.div>

            {/* User Actions */}
            <motion.div
              className="flex items-center gap-4"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
            >
              <Button
                variant="ghost"
                size="sm"
                onClick={toggleTheme}
                className="p-2"
              >
                {theme === 'dark' ? (
                  <Sun className="w-5 h-5 text-yellow-400" />
                ) : (
                  <Moon className="w-5 h-5 text-gray-600" />
                )}
              </Button>

              <div className="flex items-center gap-3">
                <Avatar className="w-8 h-8">
                  <AvatarImage src={user?.photoURL || ''} />
                  <AvatarFallback>
                    {user?.displayName?.charAt(0) || user?.email?.charAt(0)}
                  </AvatarFallback>
                </Avatar>
                <span className="text-sm font-medium text-gray-700 dark:text-gray-300 hidden sm:block">
                  {user?.displayName || user?.email}
                </span>
              </div>

              <Button
                variant="ghost"
                size="sm"
                onClick={signOut}
                className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
              >
                <LogOut className="w-4 h-4" />
              </Button>
            </motion.div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 relative z-10">
        {/* Header Actions */}
        <motion.div
          className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div>
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
              Your Tasks
            </h2>
            <p className="text-gray-600 dark:text-gray-400">
              Manage and collaborate on your tasks
            </p>
          </div>

          <Button
            onClick={() => setIsTaskModalOpen(true)}
            className="bg-gradient-to-r from-primary to-purple-600 hover:from-primary/90 hover:to-purple-600/90 text-white shadow-lg"
          >
            <motion.div
              className="flex items-center gap-2"
              whileTap={{ scale: 0.95 }}
            >
              <Plus className="w-4 h-4" />
              Add Task
            </motion.div>
          </Button>
        </motion.div>

        {/* Task Filters */}
        <motion.div
          className="flex flex-wrap gap-2 mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          {filters.map((filter) => (
            <Button
              key={filter.key}
              variant={currentFilter === filter.key ? 'default' : 'outline'}
              size="sm"
              onClick={() => setCurrentFilter(filter.key)}
              className={`transition-all ${
                currentFilter === filter.key
                  ? 'bg-primary text-white'
                  : 'hover:bg-gray-100 dark:hover:bg-gray-800'
              }`}
            >
              {filter.label}
              {filter.count > 0 && (
                <Badge variant="secondary" className="ml-2 text-xs">
                  {filter.count}
                </Badge>
              )}
            </Button>
          ))}
        </motion.div>

        {/* Tasks Grid */}
        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => (
              <div
                key={i}
                className="h-48 bg-gray-200 dark:bg-gray-700 rounded-2xl animate-pulse"
              />
            ))}
          </div>
        ) : filteredTasks.length === 0 ? (
          <motion.div
            className="text-center py-16"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <motion.div
              className="mb-6"
              animate={{
                y: [0, -10, 0],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                repeatType: 'reverse',
              }}
            >
              <i className="fas fa-tasks text-6xl text-gray-300 dark:text-gray-600" />
            </motion.div>
            <h3 className="text-xl font-semibold text-gray-700 dark:text-gray-300 mb-2">
              No tasks yet
            </h3>
            <p className="text-gray-500 dark:text-gray-400 mb-6">
              Create your first task to get started
            </p>
            <Button
              onClick={() => setIsTaskModalOpen(true)}
              className="bg-primary hover:bg-primary/90"
            >
              <Plus className="w-4 h-4 mr-2" />
              Add Your First Task
            </Button>
          </motion.div>
        ) : (
          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 auto-rows-fr"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            <AnimatePresence>
              {filteredTasks.map((task) => (
                <TaskCard
                  key={task.id}
                  task={task}
                  onComplete={handleCompleteTask}
                  onDetail={handleTaskDetail}
                />
              ))}
            </AnimatePresence>
          </motion.div>
        )}
      </main>

      {/* Modals */}
      <TaskModal
        isOpen={isTaskModalOpen}
        onClose={() => {
          setIsTaskModalOpen(false);
          setEditingTask(null);
        }}
        onSave={editingTask ? handleUpdateTask : handleCreateTask}
        task={editingTask || undefined}
        isLoading={isCreating || isUpdating}
      />

      <TaskDetailModal
        isOpen={isDetailModalOpen}
        onClose={() => {
          setIsDetailModalOpen(false);
          setSelectedTask(null);
        }}
        onEdit={handleEditTask}
        onDelete={handleDeleteTask}
        task={selectedTask}
      />

      <CongratsModal
        isOpen={isCongratsModalOpen}
        onClose={() => setIsCongratsModalOpen(false)}
        userName={user?.displayName || 'Champion'}
      />
    </div>
  );
};

export default Dashboard;
