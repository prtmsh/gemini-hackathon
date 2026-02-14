import { useMemo } from "react";
import { Link } from "wouter";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { getAdTemplate } from "@/lib/ad-template";
import { getMatrixSession } from "@/lib/matrix-session";

export default function ResultsView() {
  const matrixSession = useMemo(() => getMatrixSession(), []);

  if (!matrixSession) {
    return (
      <div className="min-h-screen bg-background p-6 lg:p-12">
        <div className="max-w-4xl mx-auto space-y-6">
          <h1 className="font-display text-3xl md:text-4xl font-bold">No generated matrix found</h1>
          <p className="text-muted-foreground">
            Generate a campaign first to view matrix results.
          </p>
          <Link href="/">
            <Button>
              <ArrowLeft className="mr-2 h-4 w-4" /> Back to Generator
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  const { matrixData, logoBase64, productBase64 } = matrixSession;
  const columns = matrixData.columns;
  const numRows = columns[0]?.variations.length ?? 0;

  return (
    <div className="min-h-screen bg-[#111] p-6 lg:p-8 text-white">
      <div className="max-w-[95%] mx-auto space-y-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-1">
            <Link href="/">
              <Button variant="ghost" className="pl-0 hover:bg-transparent hover:text-primary mb-2 text-white">
                <ArrowLeft className="mr-2 h-4 w-4" /> Back to Config
              </Button>
            </Link>
            <h1 className="font-display text-3xl md:text-4xl font-bold">Campaign Matrix</h1>
            <p className="text-white/70">{columns.length} languages × {numRows} variations</p>
          </div>
        </div>

        <div className="overflow-x-auto pb-4">
          <div
            className="grid gap-5"
            style={{
              gridTemplateColumns: `repeat(${Math.max(columns.length, 1)}, minmax(320px, 1fr))`,
            }}
          >
            {columns.map((column) => (
              <div
                key={column.language}
                className="text-center text-xl font-bold py-4 px-3 bg-[#222] rounded-lg mb-2 text-[#4285f4] uppercase border-b-2 border-[#333]"
              >
                {column.language}
              </div>
            ))}

            {Array.from({ length: numRows }).map((_, rowIndex) =>
              columns.map((column) => {
                const variant = column.variations[rowIndex];
                if (!variant) {
                  return <div key={`${column.language}-${rowIndex}`} />;
                }

                const htmlContent = getAdTemplate(variant, logoBase64, productBase64);
                return (
                  <div
                    key={`${column.language}-${variant.style}-${rowIndex}`}
                    className="bg-[#1a1a1a] rounded-xl overflow-hidden border border-[#333] shadow-[0_10px_30px_rgba(0,0,0,0.5)] flex flex-col"
                  >
                    <div className="p-2.5 border-b border-[#333] bg-black flex justify-between items-center">
                      <span className="inline-block px-2 py-1 rounded text-[0.65rem] font-bold uppercase bg-[#333] text-white whitespace-nowrap overflow-hidden text-ellipsis max-w-full">
                        {variant.style}
                      </span>
                    </div>
                    <div className="w-full relative bg-black" style={{ aspectRatio: "9 / 16" }}>
                      <iframe
                        className="w-full h-full border-none pointer-events-none"
                        srcDoc={htmlContent}
                        title={`${column.language}-${variant.style}`}
                      />
                    </div>
                  </div>
                );
              }),
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
