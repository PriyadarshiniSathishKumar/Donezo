import React from 'react';
import { motion } from 'framer-motion';
import { Task } from '@shared/schema';
import { Calendar, Users, CheckCircle2 } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

interface TaskCardProps {
  task: Task;
  onComplete: (taskId: number) => void;
  onDetail: (taskId: number) => void;
}

const TaskCard: React.FC<TaskCardProps> = ({ task, onComplete, onDetail }) => {
  const isCompleted = task.status === 'completed';
  const isOverdue = task.dueDate && new Date(task.dueDate) < new Date() && !isCompleted;

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high':
        return 'bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-300 border-l-red-500';
      case 'medium':
        return 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900 dark:text-yellow-300 border-l-yellow-500';
      case 'low':
        return 'bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300 border-l-green-500';
      default:
        return 'bg-gray-100 text-gray-700 dark:bg-gray-900 dark:text-gray-300 border-l-gray-500';
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20, rotateX: -15 }}
      animate={{ opacity: 1, y: 0, rotateX: 0 }}
      exit={{ opacity: 0, y: -20, rotateX: 15 }}
      whileHover={{ 
        y: -8, 
        scale: 1.03,
        rotateX: 2,
        rotateY: 2,
        boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)",
        transition: { duration: 0.3 }
      }}
      transition={{ duration: 0.4, type: "spring", stiffness: 300 }}
      style={{ 
        transformStyle: "preserve-3d",
        perspective: "1000px" 
      }}
    >
      <Card
        className={`cursor-pointer transition-all duration-300 hover:shadow-xl border-l-4 ${getPriorityColor(task.priority)} ${
          isCompleted ? 'opacity-75' : ''
        } h-full flex flex-col`}
        onClick={() => onDetail(task.id)}
      >

        <CardContent className="p-6 flex-1 flex flex-col">
          <div className="flex items-start justify-between mb-4">
            <div className="flex-1">
              <h3
                className={`font-semibold text-lg mb-2 ${
                  isCompleted ? 'line-through text-gray-500' : 'text-gray-900 dark:text-white'
                }`}
              >
                {task.title}
              </h3>
              <p className="text-gray-600 dark:text-gray-400 text-sm line-clamp-2 min-h-[2.5rem]">
                {task.description || 'No description'}
              </p>
            </div>
            <Button
              variant="ghost"
              size="sm"
              className={`ml-4 w-8 h-8 p-0 rounded-full border-2 transition-all hover:scale-110 ${
                isCompleted
                  ? 'bg-green-500 border-green-500 text-white'
                  : 'border-gray-300 dark:border-gray-600 hover:border-green-500'
              }`}
              onClick={(e) => {
                e.stopPropagation();
                onComplete(task.id);
              }}
            >
              {isCompleted && <CheckCircle2 className="w-4 h-4" />}
            </Button>
          </div>

          <div className="mt-auto space-y-3">
            <div className="flex items-center justify-between text-sm">
              <div className="flex items-center gap-4">
                <Badge variant="secondary" className="text-xs font-medium">
                  {task.priority.toUpperCase()}
                </Badge>
                {isOverdue && (
                  <span className="text-red-500 font-medium">Overdue</span>
                )}
              </div>
              {task.dueDate && (
                <div className="flex items-center gap-1 text-gray-500 dark:text-gray-400">
                  <Calendar className="w-4 h-4" />
                  <span>{formatDate(task.dueDate.toString())}</span>
                </div>
              )}
            </div>

            {task.sharedWith && task.sharedWith.length > 0 && (
              <div className="flex items-center gap-2">
                <Users className="w-4 h-4 text-gray-400" />
                <span className="text-xs text-gray-500 dark:text-gray-400">
                  Shared with {task.sharedWith.length} user(s)
                </span>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default TaskCard;
