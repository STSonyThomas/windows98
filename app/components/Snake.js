'use client';
import React, { useState, useEffect, useCallback } from 'react';
import styles from './snake.module.css';

const GRID_SIZE = 20;
const CELL_SIZE = 20;
const INITIAL_SNAKE = [{ x: 10, y: 10 }];
const INITIAL_DIRECTION = { x: 1, y: 0 };
const INITIAL_FOOD = { x: 15, y: 15 };

export default function Snake({ onClose }) {
  const [snake, setSnake] = useState(INITIAL_SNAKE);
  const [direction, setDirection] = useState(INITIAL_DIRECTION);
  const [food, setFood] = useState(INITIAL_FOOD);
  const [gameOver, setGameOver] = useState(false);
  const [score, setScore] = useState(0);
  const [speed, setSpeed] = useState(150);

  const generateFood = useCallback(() => {
    let newFood;
    do {
      newFood = {
        x: Math.floor(Math.random() * GRID_SIZE),
        y: Math.floor(Math.random() * GRID_SIZE)
      };
    } while (snake.some(segment => segment.x === newFood.x && segment.y === newFood.y));
    return newFood;
  }, [snake]);

  const checkCollision = useCallback((head) => {
    // Wall collision
    if (head.x < 0 || head.x >= GRID_SIZE || head.y < 0 || head.y >= GRID_SIZE) {
      return true;
    }
    // Self collision
    return snake.some(segment => segment.x === head.x && segment.y === head.y);
  }, [snake]);

  const moveSnake = useCallback(() => {
    if (gameOver) return;

    const newSnake = [...snake];
    const head = {
      x: newSnake[0].x + direction.x,
      y: newSnake[0].y + direction.y
    };

    if (checkCollision(head)) {
      setGameOver(true);
      return;
    }

    newSnake.unshift(head);

    if (head.x === food.x && head.y === food.y) {
      setFood(generateFood());
      setScore(prev => prev + 10);
      setSpeed(prev => Math.max(prev - 5, 50));
    } else {
      newSnake.pop();
    }

    setSnake(newSnake);
  }, [snake, direction, food, gameOver, checkCollision, generateFood]);

  useEffect(() => {
    const handleKeyPress = (e) => {
      e.preventDefault();
      switch (e.key) {
        case 'ArrowUp':
          if (direction.y === 0) setDirection({ x: 0, y: -1 });
          break;
        case 'ArrowDown':
          if (direction.y === 0) setDirection({ x: 0, y: 1 });
          break;
        case 'ArrowLeft':
          if (direction.x === 0) setDirection({ x: -1, y: 0 });
          break;
        case 'ArrowRight':
          if (direction.x === 0) setDirection({ x: 1, y: 0 });
          break;
        case 'Escape':
          onClose();
          break;
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [direction, onClose]);

  useEffect(() => {
    const gameLoop = setInterval(moveSnake, speed);
    return () => clearInterval(gameLoop);
  }, [moveSnake, speed]);

  const resetGame = () => {
    setSnake(INITIAL_SNAKE);
    setDirection(INITIAL_DIRECTION);
    setFood(INITIAL_FOOD);
    setGameOver(false);
    setScore(0);
    setSpeed(150);
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div className={styles.score}>Score: {score}</div>
        <button className={styles.closeButton} onClick={onClose}>×</button>
      </div>
      <div className={styles.gameArea} style={{ 
        width: GRID_SIZE * CELL_SIZE,
        height: GRID_SIZE * CELL_SIZE 
      }}>
        {snake.map((segment, i) => (
          <div
            key={i}
            className={styles.snakeSegment}
            style={{
              left: segment.x * CELL_SIZE,
              top: segment.y * CELL_SIZE,
              width: CELL_SIZE,
              height: CELL_SIZE
            }}
          />
        ))}
        <div
          className={styles.food}
          style={{
            left: food.x * CELL_SIZE,
            top: food.y * CELL_SIZE,
            width: CELL_SIZE,
            height: CELL_SIZE
          }}
        />
      </div>
      {gameOver && (
        <div className={styles.gameOver}>
          <h2>Game Over!</h2>
          <p>Score: {score}</p>
          <button className={styles.resetButton} onClick={resetGame}>
            Play Again
          </button>
        </div>
      )}
      <div className={styles.controls}>
        <p>Use arrow keys to move</p>
        <p>Press ESC to exit</p>
      </div>
    </div>
  );
}
