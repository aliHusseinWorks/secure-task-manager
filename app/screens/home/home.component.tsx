import React, { useEffect, useState, useRef } from "react";
import {
  View,
  Text,
  FlatList,
  Button,
  StyleSheet,
  TouchableOpacity,
  Animated,
  Switch,
} from "react-native";

import { Header, LoadingSpinner, TextField } from "../../components";
import { useTheme } from "../../context";
import {
  fetchTasks,
  addTask,
  toggleTask as toggleTaskService,
} from "../../services/task.service";
import { Task as ApiTask } from "../../services/service.type";
import { Task as LocalTask } from "./home.type";

const normalizeTask = (task: ApiTask): LocalTask => ({
  id: String(task.id),
  name: task.title || "Untitled",
  duration: 30,
  completed: task.completed,
});

const HomeScreen = ({ navigation }: any) => {
  const [tasks, setTasks] = useState<LocalTask[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [newTaskName, setNewTaskName] = useState("");
  const fadeAnim = useRef(new Animated.Value(1)).current;
  const { theme } = useTheme();

  useEffect(() => {
    loadTasks();
  }, []);

  const loadTasks = async () => {
    setLoading(true);
    setError("");
    try {
      const data = await fetchTasks();
      setTasks(data.map(normalizeTask));
    } catch (err: any) {
      setError(err.message || "Failed to load tasks");
    } finally {
      setLoading(false);
    }
  };

  const handleAddTask = async () => {
    if (!newTaskName) return;
    setLoading(true);
    setError("");
    try {
      const newTask = await addTask(newTaskName);
      setTasks((prev) => [normalizeTask(newTask), ...prev]);
      setNewTaskName("");
      await new Promise((resolve) => setTimeout(resolve, 300));
    } catch (err: any) {
      setError("Failed to add task");
    } finally {
      setLoading(false);
    }
  };

  const handleToggleTask = async (id: string) => {
    Animated.sequence([
      Animated.timing(fadeAnim, {
        toValue: 0.3,
        duration: 200,
        useNativeDriver: true,
      }),
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 200,
        useNativeDriver: true,
      }),
    ]).start();
    setError("");
    try {
      const updated = await toggleTaskService(Number(id));
      setTasks(updated.map(normalizeTask));
    } catch (err: any) {
      setError("Failed to update task");
    }
  };

  if (loading) return <LoadingSpinner />;

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      <Header navigation={navigation} />
      {error ? (
        <Text style={[styles.error, { color: theme.error }]}>{error}</Text>
      ) : null}
      <FlatList
        data={tasks}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <Animated.View
            style={[
              styles.task,
              {
                opacity: fadeAnim,
                backgroundColor: item.completed ? theme.success : theme.card,
                flexDirection: "row", // Ensure row layout for the card
                alignItems: "center",
                justifyContent: "space-between",
              },
            ]}
          >
            <Text style={[styles.taskText, { color: theme.text, flex: 1 }]}>
              {item.name} - {item.duration} mins
            </Text>
            <Switch
              value={item.completed}
              onValueChange={() => handleToggleTask(item.id)}
              trackColor={{
                false: theme.switchTrackOff,
                true: theme.switchTrackOn,
              }}
              thumbColor={
                item.completed ? theme.switchThumbOn : theme.switchThumbOff
              }
              style={{ marginLeft: 12 }}
            />
          </Animated.View>
        )}
        showsVerticalScrollIndicator={false}
        style={styles.listContainer}
        contentContainerStyle={styles.tasksContainer}
      />
      <View style={styles.footer}>
        <TextField
          placeholder="Task Name"
          style={[
            styles.input,
            { backgroundColor: theme.input, color: theme.text },
          ]}
          value={newTaskName}
          onChangeText={setNewTaskName}
        />
        <Button title="Add Task" onPress={handleAddTask} />
      </View>
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: "3%",
  },
  task: {
    padding: "4%",
    borderRadius: 8,
  },
  taskText: {
    fontSize: 16,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 10,
    borderRadius: 6,
  },
  error: {
    color: "red",
    marginTop: 24,
    textAlign: "center",
  },
  listContainer: { marginVertical: 24 },
  tasksContainer: { gap: 12 },
  footer: { gap: 12 },
});
