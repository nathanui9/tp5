const { SSMClient, GetParametersByPathCommand } = require("@aws-sdk/client-ssm");

exports.handler = async () => {
  const client = new SSMClient({});
  const path = process.env.PARAM_PATH;

  try {
    let nextToken;
    const items = [];

    do {
      const cmd = new GetParametersByPathCommand({
        Path: path,
        Recursive: true,
        WithDecryption: false,
        NextToken: nextToken,
      });

      const resp = await client.send(cmd);

      for (const p of resp.Parameters || []) {
        items.push({
          name: p.Name,
          type: p.Type,
          version: p.Version,
          lastModifiedDate: p.LastModifiedDate,
        });
      }

      nextToken = resp.NextToken;
    } while (nextToken);

    items.sort((a, b) => a.name.localeCompare(b.name));

    console.log(`Lecture sécurisée de ${items.length} paramètres sous ${path}`);

    return {
      statusCode: 200,
      body: JSON.stringify({
        loaded: items.length,
        parameters: items,
      }),
    };
  } catch (error) {
    console.error("Erreur pendant la lecture SSM:", error.message);
    return {
      statusCode: 500,
      body: JSON.stringify({
        error: "Internal Server Error",
      }),
    };
  }
};
