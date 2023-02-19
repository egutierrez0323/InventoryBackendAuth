type Environments = 'development' | 'production';
export const NODE_ENVIRONMENTS = (
  nodeEnv: string | undefined,
): Environments => {
  const environments: Environments[] = ['development', 'production'];

  if (!(environments as string[]).includes(nodeEnv ?? '')) {
    throw new Error(
      `NODE_ENVIRONMENTS Invalido: 
            "process.env.NODE_ENVIRONMENTS". Valores permitidos: " 
            ${environments.join(',')} `,
    );
  }
  return nodeEnv as Environments;
};

type Engines = 'mssql' | 'postgres' | 'mysql' | 'mariadb' | 'mongodb';
export const DATABASE_ENGINE = (dbEngine: string | undefined): Engines => {
  const Eng: Engines[] = ['mssql', 'postgres'];

  if (!(Eng as string[]).includes(dbEngine ?? '')) {
    throw new Error(
      `DATABASE_ENGINE Invalido: 
            "process.env.DATABASE_ENGINE". Valores permitidos: " 
            ${Eng.join(',')} `,
    );
  }
  return dbEngine as Engines;
};

export const DATABASE_PORT = (portApp: any): number => {
  if (isNaN(parseInt(portApp))) {
    throw new Error(
      'Invalid DATABASE_PORT value, this values must be a number',
    );
  }

  if ((portApp ?? '') === '') {
    throw new Error('Invalid DATABASE_PORT value, this values not can be null');
  }

  return parseInt(portApp);
};

export const SERVER_NAME = (serverName: string): string => {
  if (serverName.trim() === '') {
    throw new Error('"process.env.SERVER_NAME is required"');
  }
  return serverName;
};

export const PORT_APP = (portApp: any): number => {
  if (isNaN(parseInt(portApp))) {
    throw new Error('Invalid PORT_APP value, this values must be a number');
  }

  if ((portApp ?? '') === '') {
    throw new Error('Invalid PORT_APP value, this values not can be null');
  }

  return parseInt(portApp);
};

export const DATABASE_NAME = (databaseName: string): string => {
  if (databaseName.trim() === '') {
    throw new Error('"process.env.DATABASE_NAME is required"');
  }

  return databaseName;
};

export const DATABASE_USER = (databaseUser: string): string => {
  if (databaseUser.trim() === '') {
    throw new Error('"process.env.databaseUser is required"');
  }

  return databaseUser;
};

export const DATABASE_PASS = (databasePass: string): string => {
  if (databasePass.trim() === '') {
    throw new Error('"process.env.DATABASE_PASS is required"');
  }

  return databasePass;
};
