import {
  Building2,
  Calendar,
  DollarSign,
  ExternalLink,
  Tag,
  Users,
  X,
} from 'lucide-react';
import type { Tool } from '../../types';
import DetailItem from './DetailItem';
import Badge from './Badge';
import { normalizeStatus } from '../../utils/normalizeStatus';
import DetailLabel from './DetailLabel';
import BackdropBlur from './BackdropBlur';

interface ToolModalProps {
  tool: Tool;
  onClose: () => void;
}

const ToolModal: React.FC<ToolModalProps> = props => {
  const { tool, onClose } = props;
  return (
    <>
      <BackdropBlur handleClick={onClose} />

      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 pointer-events-none">
        <div
          className="bg-white rounded-2xl shadow-xl w-full max-w-2xl pointer-events-auto h-full  overflow-y-auto"
          onClick={e => e.stopPropagation()}
        >
          <div className="p-6 border-b border-gray-200 flex items-center justify-between">
            <div>
              <h2 className="text-lg font-semibold text-gray-900">
                {tool.name}
              </h2>
              <p className="text-sm text-gray-500">{tool.vendor}</p>
            </div>
            <button
              onClick={onClose}
              className="p-2 rounded-xl text-gray-400 hover:bg-gray-100 hover:text-gray-600 transition-colors min-w-11 min-h-11 flex items-center justify-center"
            >
              <X size={18} />
            </button>
          </div>
          <div className="flex-1 overflow-y-auto p-6 flex flex-col gap-6">
            {tool.description && (
              <p className="text-sm text-gray-600 leading-relaxed">
                {tool.description}
              </p>
            )}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <DetailItem
                label="Monthly Cost"
                value={
                  tool.monthly_cost != null
                    ? `€${Number(tool.monthly_cost).toLocaleString()}`
                    : '-'
                }
                icon={DollarSign}
              />
              <DetailItem
                label="Active Users"
                value={tool.active_users_count ?? '-'}
                icon={Users}
              />
              <DetailItem
                label="Department"
                value={tool.owner_department ?? '-'}
                icon={Building2}
              />
              <DetailItem label="Category" value={tool.category} icon={Tag} />
            </div>
            <div className="flex items-center justify-between">
              <div className="flex flex-col gap-1">
                <DetailLabel value="status" />
                {tool.status && <Badge status={normalizeStatus(tool.status)} />}
              </div>
            </div>
            {tool.updated_at && (
              <div className="flex flex-col items-end gap-1">
                <DetailLabel value="Updated at" />
                <div className="flex items-center gap-1.5 text-sm text-gray-600">
                  <Calendar size={14} className="text-gray-400" />
                  {new Date(tool.updated_at).toLocaleDateString('en-GB', {
                    day: '2-digit',
                    month: 'short',
                    year: 'numeric',
                  })}
                </div>
              </div>
            )}
          </div>
          <div className="flex items-center justify-between p-6 border-t border-gray-200 gap-3">
            {tool.website_url && (
              <a
                href={tool.website_url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-sm text-blue-600 hover:text-blue-700 font-medium"
              >
                <ExternalLink size={14} />
                Visit website
              </a>
            )}
            <div className="flex items-center gap-3 ml-auto">
              <button
                onClick={onClose}
                className="px-4 py-2.5 rounded-xl border border-gray-200 text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ToolModal;
