import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle2 } from 'lucide-react';
import {
  Dialog,
  DialogContent,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';

interface CongratsModalProps {
  isOpen: boolean;
  onClose: () => void;
  userName?: string;
}

const CongratsModal: React.FC<CongratsModalProps> = ({
  isOpen,
  onClose,
  userName = 'Champion',
}) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md text-center backdrop-blur-lg bg-white/95 dark:bg-gray-900/95 border border-white/20 dark:border-gray-700/30 shadow-2xl overflow-hidden">
        {/* Animated background particles */}
        <motion.div className="absolute inset-0 overflow-hidden pointer-events-none">
          {[...Array(20)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-2 h-2 bg-gradient-to-r from-primary to-purple-500 rounded-full opacity-60"
              initial={{
                x: Math.random() * 400,
                y: Math.random() * 300,
                scale: 0,
              }}
              animate={{
                y: [null, -50, -100],
                scale: [0, 1, 0],
                rotate: [0, 360],
              }}
              transition={{
                duration: 2 + Math.random() * 2,
                repeat: Infinity,
                delay: Math.random() * 2,
              }}
            />
          ))}
        </motion.div>

        <motion.div
          initial={{ scale: 0.5, opacity: 0, rotateY: -180 }}
          animate={{ scale: 1, opacity: 1, rotateY: 0 }}
          transition={{ duration: 0.8, type: "spring", stiffness: 200 }}
          className="space-y-6 p-2 relative z-10"
          style={{ transformStyle: "preserve-3d" }}
        >
          <motion.div
            initial={{ scale: 0, rotateZ: -180 }}
            animate={{ scale: 1, rotateZ: 0 }}
            transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
            className="mx-auto"
          >
            <motion.div 
              className="w-24 h-24 bg-gradient-to-r from-green-400 via-emerald-500 to-green-600 rounded-full flex items-center justify-center mx-auto mb-4 relative shadow-2xl"
              animate={{
                boxShadow: [
                  "0 0 20px rgba(34, 197, 94, 0.4)",
                  "0 0 40px rgba(34, 197, 94, 0.8)",
                  "0 0 20px rgba(34, 197, 94, 0.4)"
                ]
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
              }}
            >
              {/* Pulsing ring effect */}
              <motion.div
                className="absolute inset-0 border-4 border-green-400 rounded-full"
                animate={{
                  scale: [1, 1.5, 1],
                  opacity: [1, 0, 1],
                }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  delay: 0.5
                }}
              />
              
              <motion.div
                animate={{ 
                  scale: [1, 1.3, 1],
                  rotate: [0, 15, -15, 0],
                  rotateY: [0, 180, 360]
                }}
                transition={{ 
                  duration: 1.2, 
                  repeat: 3,
                  delay: 0.3
                }}
              >
                <CheckCircle2 className="w-12 h-12 text-white drop-shadow-lg" />
              </motion.div>
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
              Congratulations!
            </h3>
            <p className="text-gray-600 dark:text-gray-400">
              Keep rocking, {userName}!
            </p>
          </motion.div>

          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.6 }}
          >
            <Button
              onClick={onClose}
              className="bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white px-8 py-3"
            >
              <motion.span
                whileTap={{ scale: 0.95 }}
              >
                Awesome!
              </motion.span>
            </Button>
          </motion.div>
        </motion.div>
      </DialogContent>
    </Dialog>
  );
};

export default CongratsModal;
