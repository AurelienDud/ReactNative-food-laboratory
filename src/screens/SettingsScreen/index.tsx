import { ScreenContainer } from '@/src/components/ScreenContainer';
import { Spacer } from '@/src/components/Spacer';
import { ThemedText } from '@/src/components/ThemedText/index';
import { getDb } from '@/src/data/db/getDb';
import { Button } from 'react-native-paper';

export const SettingsScreen = () => {
  const logDB = async () => {
    const db = await getDb();
    const tables = db.getAllAsync(
      `SELECT name FROM sqlite_master WHERE type='table'`
    );
    const projects = await db.getAllAsync(`SELECT * FROM projects`);
    const projectSteps = await  db.getAllAsync(`SELECT * FROM projectSteps`);
    const assets = await  db.getAllAsync(`SELECT * FROM assets`);
    const project_projectSteps = await  db.getAllAsync(`SELECT * FROM project_projectSteps`);
    const projectStep_assets = await  db.getAllAsync(`SELECT * FROM projectStep_assets`);
    
    console.log('all tables: ', tables);
    console.log('projects: ', projects);
    console.log('projectSteps: ', projectSteps);
    console.log('assets: ', assets);
    console.log('project_projectSteps: ', project_projectSteps);
    console.log('projectStep_assets: ', projectStep_assets);
  }


  return (
    <ScreenContainer>
      <Spacer>
        <ThemedText>
          Currently used for debug.
        </ThemedText>
        <Button onPress={() => logDB()} mode='contained-tonal'>
          log the DB
        </Button>
      </Spacer>
    </ScreenContainer>
  );
}